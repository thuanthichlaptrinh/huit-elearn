import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Assignment.module.scss';
import { Button, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { db } from '../../firebase/config';
import { addDoc, collection, getDocs, serverTimestamp, query, where } from 'firebase/firestore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Assignment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const testSavedRef = useRef(false);
    const maDeRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    // Utility function to fetch with timeout
    const fetchWithTimeout = async (url, options, timeout = 180000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    // Function to fetch questions from the AI
    const fetchAIQuestions = async (prompt, retries = 5, maxTokens = 1500) => {
        if (!prompt || prompt.trim() === '') {
            throw new Error('Prompt không hợp lệ hoặc rỗng. Vui lòng kiểm tra lại.');
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await fetchWithTimeout(
                    'http://127.0.0.1:1234/v1/chat/completions',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            model: 'gemma-3-1b-it',
                            messages: [
                                { role: 'system', content: 'Bạn là một trợ lý AI chuyên tạo câu hỏi trắc nghiệm.' },
                                { role: 'user', content: prompt },
                            ],
                            temperature: 0.7,
                            max_tokens: maxTokens,
                            stream: false,
                        }),
                    },
                    180000,
                );

                if (!response.ok) {
                    throw new Error(`Không thể kết nối đến server AI. Status: ${response.status}`);
                }

                const data = await response.json();
                const content = data.choices[0]?.message?.content || '';
                if (!content) {
                    throw new Error('Phản hồi từ AI rỗng.');
                }

                // Log dữ liệu thô
                console.log('Dữ liệu thô từ AI:', content);

                // Loại bỏ Markdown và các ký tự không mong muốn
                let cleanedData = content
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .replace(/^\s*[\r\n]*/gm, '')
                    .trim();

                // Log dữ liệu sau khi làm sạch
                console.log('Dữ liệu sau khi làm sạch:', cleanedData);

                // Kiểm tra và parse JSON
                let parsedQuestions;
                try {
                    parsedQuestions = JSON.parse(cleanedData);
                    if (!parsedQuestions.questions || !Array.isArray(parsedQuestions.questions)) {
                        throw new Error('Dữ liệu không chứa mảng "questions" hợp lệ.');
                    }

                    parsedQuestions.questions.forEach((question, index) => {
                        if (
                            !question.noiDungCauHoi ||
                            !question.phanLoai ||
                            !question.maMH ||
                            !question.cauTraLoi ||
                            question.cauTraLoi.length !== 4 ||
                            !question.cauTraLoi.every(
                                (answer) => answer.noiDung !== undefined && answer.isCorrect !== undefined,
                            )
                        ) {
                            throw new Error(`Câu hỏi ${index + 1} không hoàn chỉnh hoặc không đúng định dạng.`);
                        }
                    });
                } catch (parseError) {
                    console.error('Lỗi khi phân tích JSON từ AI:', parseError);
                    console.log('Dữ liệu nhận được sau khi làm sạch:', cleanedData);
                    throw new Error('Định dạng dữ liệu từ AI không đúng. Vui lòng kiểm tra log để biết thêm chi tiết.');
                }

                return parsedQuestions;
            } catch (error) {
                console.error(`Thử lần ${attempt} thất bại:`, error.message);
                if (attempt === retries) {
                    throw new Error(
                        `Không thể lấy dữ liệu từ AI sau ${retries} lần thử: ${error.message}. Mô hình có thể quá nặng, hãy thử model nhẹ hơn như gemma-2b-it hoặc kiểm tra phần cứng của bạn (CPU/GPU usage).`,
                    );
                }
                maxTokens = Math.max(500, maxTokens - 200);
                console.log(`Giảm max_tokens xuống ${maxTokens} cho lần thử tiếp theo.`);
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    };

    // Function to save the test to Firestore
    const saveTestToFirestore = async (generatedQuestions) => {
        if (testSavedRef.current) {
            console.log('Test already saved, skipping save operation.');
            return;
        }

        try {
            const difficultyMap = {
                easy: 'Dễ',
                medium: 'Trung bình',
                hard: 'Khó',
            };
            const mappedDifficulty = difficultyMap[state.difficulty.toLowerCase()] || state.difficulty;

            if (!maDeRef.current) {
                maDeRef.current = `DE${Date.now()}`;
            }
            const uniqueMaDe = maDeRef.current;

            const testData = {
                MaCauHoi: generatedQuestions.map((q) =>
                    state.creationMethod === 'bank' ? q.MaCauHoi || q.id : `AI_${q.MaMH}_${q.NoiDungCauHoi}`,
                ),
                MaDe: uniqueMaDe,
                MaMon: state.subject || '',
                MaNguoiDung: user && user.MaNguoiDung ? user.MaNguoiDung : 'anonymous',
                NgayTao: serverTimestamp(),
                SoLuongCauHoi: generatedQuestions.length,
                TenDe: state.subjectName
                    ? `${state.subjectName} - ${mappedDifficulty} (${uniqueMaDe})`
                    : `Đề ${uniqueMaDe}`,
            };

            const testRef = collection(db, 'test');
            const q = query(
                testRef,
                where('MaNguoiDung', '==', user && user.MaNguoiDung ? user.MaNguoiDung : 'anonymous'),
                where('MaDe', '==', uniqueMaDe),
            );
            const existingTests = await getDocs(q);

            if (existingTests.empty) {
                const docRef = await addDoc(collection(db, 'test'), testData);
                testSavedRef.current = true;
                console.log('Đã lưu bài kiểm tra vào Firestore:', { id: docRef.id, ...testData });
            } else {
                console.log('Bài kiểm tra với MaDe này đã tồn tại, không lưu lại');
                testSavedRef.current = true;
            }
        } catch (error) {
            console.error('Lỗi khi lưu bài kiểm tra vào Firestore:', error);
            throw new Error('Đã xảy ra lỗi khi lưu bài kiểm tra. Vui lòng thử lại sau.');
        }
    };

    // Generate questions when the component mounts
    useEffect(() => {
        let isMounted = true;

        const generateQuestions = async () => {
            if (!state || !state.creationMethod || !state.subject || !state.difficulty || !state.questionCount) {
                if (isMounted) {
                    setErrorMessage('Dữ liệu không hợp lệ. Vui lòng quay lại và tạo bài kiểm tra mới.');
                }
                return;
            }

            try {
                let generatedQuestions = [];

                if (state.creationMethod === 'ai') {
                    const difficultyMap = {
                        easy: 'Dễ',
                        medium: 'Trung bình',
                        hard: 'Khó',
                    };
                    const mappedDifficulty = difficultyMap[state.difficulty.toLowerCase()] || state.difficulty;

                    const batchSize = 5;
                    const totalQuestionsNeeded = state.questionCount;
                    let allQuestions = [];

                    while (allQuestions.length < totalQuestionsNeeded) {
                        const questionsToGenerate = Math.min(batchSize, totalQuestionsNeeded - allQuestions.length);
                        const prompt = `Tạo ${questionsToGenerate} câu hỏi trắc nghiệm cho môn học "${state.subjectName}" với độ khó "${mappedDifficulty}".  
Mỗi câu hỏi phải có 4 đáp án (A, B, C, D), trong đó chỉ có một đáp án đúng.  
Định dạng trả về PHẢI là JSON thuần túy với cấu trúc như sau, KHÔNG thêm bất kỳ văn bản nào khác ngoài JSON (bao gồm cả các ký tự như \`\`\`json, \`\`\`, hoặc bất kỳ chú thích nào). Nếu thêm bất kỳ văn bản nào ngoài JSON, kết quả sẽ không được chấp nhận:  
{  
  "questions": [  
    {  
      "noiDungCauHoi": "Nội dung câu hỏi 1",  
      "phanLoai": "${mappedDifficulty}",  
      "maMH": "${state.subject}",  
      "cauTraLoi": [  
        {"noiDung": "Nội dung của đáp án", "isCorrect": false},  
        {"noiDung": "Nội dung của đáp án", "isCorrect": true},  
        {"noiDung": "Nội dung của đáp án", "isCorrect": false},  
        {"noiDung": "Nội dung của đáp án", "isCorrect": false}  
      ]  
    }  
  ]  
}  
Đảm bảo JSON hợp lệ và không có bất kỳ văn bản thừa nào trước hoặc sau JSON.`;

                        console.log(
                            `Gửi yêu cầu batch để tạo ${questionsToGenerate} câu hỏi. Tổng câu hỏi hiện tại: ${allQuestions.length}/${totalQuestionsNeeded}`,
                        );

                        const parsedQuestions = await fetchAIQuestions(prompt);
                        if (!parsedQuestions.questions || parsedQuestions.questions.length === 0) {
                            console.warn(`Batch không tạo được câu hỏi nào.`);
                            continue;
                        }

                        allQuestions = [...allQuestions, ...parsedQuestions.questions];
                        console.log(
                            `Đã tạo thêm ${parsedQuestions.questions.length} câu hỏi. Tổng cộng: ${allQuestions.length}/${totalQuestionsNeeded}`,
                        );
                    }

                    generatedQuestions = allQuestions.slice(0, totalQuestionsNeeded);

                    if (generatedQuestions.length < totalQuestionsNeeded) {
                        throw new Error(
                            `Chỉ tạo được ${generatedQuestions.length} câu hỏi, không đủ ${totalQuestionsNeeded} câu như yêu cầu.`,
                        );
                    }
                } else if (state.creationMethod === 'bank') {
                    const questionsSnapshot = await getDocs(collection(db, 'questions'));
                    const allQuestions = questionsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    const difficultyMap = {
                        easy: 'Dễ',
                        medium: 'Trung bình',
                        hard: 'Khó',
                    };
                    const mappedDifficulty = difficultyMap[state.difficulty.toLowerCase()] || state.difficulty;

                    const filteredQuestions = allQuestions.filter(
                        (q) => q.MaMH === state.subject && q.PhanLoai.toLowerCase() === mappedDifficulty.toLowerCase(),
                    );

                    if (filteredQuestions.length === 0) {
                        if (isMounted) {
                            setErrorMessage(
                                'Không đủ câu hỏi trong ngân hàng để random. Vui lòng thử lại với lựa chọn khác.',
                            );
                        }
                        return;
                    }

                    const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
                    generatedQuestions = shuffledQuestions.slice(0, state.questionCount);

                    if (generatedQuestions.length < state.questionCount) {
                        if (isMounted) {
                            setErrorMessage(
                                `Chỉ tìm thấy ${generatedQuestions.length} câu hỏi, không đủ ${state.questionCount} câu như yêu cầu.`,
                            );
                        }
                        return;
                    }
                }

                if (generatedQuestions.length > 0 && isMounted) {
                    await saveTestToFirestore(generatedQuestions);
                }

                if (isMounted) {
                    // Chuẩn hóa dữ liệu để đồng bộ với giao diện
                    const formattedQuestions = generatedQuestions.map((q) => ({
                        NoiDungCauHoi: q.noiDungCauHoi || '',
                        PhanLoai: q.phanLoai || '',
                        MaMH: q.maMH || '',
                        CauTraLoi: q.cauTraLoi.map((answer) => ({
                            NoiDung: answer.noiDung || '',
                            IsCorrect: answer.isCorrect || false,
                        })),
                    }));
                    console.log('Dữ liệu sau khi chuẩn hóa:', formattedQuestions);
                    setQuestions(formattedQuestions);
                }
            } catch (error) {
                console.error('Lỗi khi tạo câu hỏi:', error);
                if (isMounted) {
                    setErrorMessage(error.message || 'Đã xảy ra lỗi khi tạo bài kiểm tra. Vui lòng thử lại sau.');
                }
            }
        };

        generateQuestions();

        return () => {
            isMounted = false;
        };
    }, [state, user]);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        if (!submitted) {
            setAnswers({
                ...answers,
                [questionIndex]: answerIndex,
            });
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        setSaved(false);
        testSavedRef.current = false;
        maDeRef.current = null;
        navigate('/');
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = answers[index];
            if (selectedAnswer !== undefined && question.CauTraLoi[selectedAnswer].IsCorrect) {
                score += 1;
            }
        });
        return score;
    };

    const handleSaveResult = async () => {
        if (!user) {
            alert('Bạn cần đăng nhập để lưu kết quả!');
            return;
        }

        try {
            const score = calculateScore();
            const resultData = {
                userId: user.uid,
                MaNguoiDung: user.MaNguoiDung || 'anonymous',
                MaMH: state.subject || '',
                answers: answers,
                score: `${score}/${questions.length}`,
                completedAt: serverTimestamp(),
                testData: {
                    MaMon: state.subject || '',
                    TenDe: state.subjectName ? `${state.subjectName} - ${state.difficulty}` : '',
                    SoLuongCauHoi: questions.length,
                },
            };

            await addDoc(collection(db, 'results'), resultData);
            setSaved(true);
            alert('Kết quả đã được lưu thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu kết quả:', error);
            alert('Lưu kết quả thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="#">Làm bài kiểm tra</Link>
            </div>

            <div className={cx('header')}>
                <p className={cx('title')}>{submitted ? 'Đáp án' : 'Danh sách câu hỏi'}</p>

                {state && state.specialtyName && state.subjectName && (
                    <div className={cx('info')}>
                        <p className={cx('faculty')}>Khoa: {state.specialtyName}</p> |
                        <p className={cx('subject')}>Môn: {state.subjectName}</p> |
                        <p className={cx('subject')}>Số câu: {state.questionCount}</p> |
                        <p className={cx('subject')}>Thời gian: {state.testTime} phút</p>
                    </div>
                )}
            </div>

            {errorMessage ? (
                <Typography variant="body1" color="error" className={cx('error-message')}>
                    {errorMessage}
                </Typography>
            ) : (
                <>
                    <div className={cx('questions')}>
                        {questions.length > 0 ? (
                            questions.map((question, questionIndex) => {
                                const selectedAnswer = answers[questionIndex];
                                const correctAnswer = question.CauTraLoi.findIndex((answer) => answer.IsCorrect);

                                return (
                                    <div key={questionIndex} className={cx('question')}>
                                        <Typography variant="body1" className={cx('question-text')}>
                                            Câu {questionIndex + 1}: {question.NoiDungCauHoi}
                                        </Typography>

                                        <RadioGroup
                                            value={selectedAnswer !== undefined ? selectedAnswer.toString() : ''}
                                            onChange={(e) =>
                                                handleAnswerChange(questionIndex, parseInt(e.target.value))
                                            }
                                        >
                                            {question.CauTraLoi.map((answer, answerIndex) => {
                                                const isSelected = selectedAnswer === answerIndex;
                                                const isCorrect = answer.IsCorrect;
                                                let radioClass = cx('answer-option');

                                                if (submitted) {
                                                    if (isSelected && isCorrect) {
                                                        radioClass = cx('answer-option', 'correct');
                                                    } else if (isSelected && !isCorrect) {
                                                        radioClass = cx('answer-option', 'incorrect');
                                                    } else if (!isSelected && isCorrect) {
                                                        radioClass = cx('answer-option', 'correct');
                                                    }
                                                }

                                                return (
                                                    <div key={answerIndex} className={cx('answer-wrapper')}>
                                                        <FormControlLabel
                                                            value={answerIndex.toString()}
                                                            control={<Radio />}
                                                            label={answer.NoiDung}
                                                            className={radioClass}
                                                            disabled={submitted}
                                                        />
                                                        {submitted && isSelected && isCorrect && (
                                                            <CheckCircleIcon className={cx('icon', 'correct')} />
                                                        )}
                                                        {submitted && isSelected && !isCorrect && (
                                                            <CancelIcon className={cx('icon', 'incorrect')} />
                                                        )}
                                                        {submitted && !isSelected && isCorrect && (
                                                            <CheckCircleIcon className={cx('icon', 'correct')} />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </div>
                                );
                            })
                        ) : (
                            <Typography variant="body1" className={cx('no-questions')}>
                                Đang tải câu hỏi, vui lòng chờ...
                            </Typography>
                        )}
                    </div>

                    {questions.length > 0 && (
                        <div className={cx('actions')}>
                            {submitted ? (
                                <>
                                    <Typography variant="h6" className={cx('score')}>
                                        Điểm: {calculateScore()}/{questions.length}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        className={cx('save-btn')}
                                        onClick={handleSaveResult}
                                        disabled={saved || !user}
                                    >
                                        Đăng tải
                                    </Button>
                                    <Button variant="contained" className={cx('reset-btn')} onClick={handleReset}>
                                        Hoàn thành
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    className={cx('submit-btn')}
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length !== questions.length}
                                >
                                    Nộp bài
                                </Button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Assignment;
