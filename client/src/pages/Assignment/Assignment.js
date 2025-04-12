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
    const testSavedRef = useRef(false); // Track if the test has been saved
    const maDeRef = useRef(null); // Store the MaDe to ensure consistency

    const { user } = useSelector((state) => state.auth);

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

            // Use the stored MaDe, or generate a new one if it doesn't exist
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

            // Kiểm tra xem bài kiểm tra đã tồn tại chưa dựa trên MaDe
            const testRef = collection(db, 'test');
            const q = query(
                testRef,
                where('MaNguoiDung', '==', user && user.MaNguoiDung ? user.MaNguoiDung : 'anonymous'),
                where('MaDe', '==', uniqueMaDe),
            );
            const existingTests = await getDocs(q);

            // Chỉ lưu nếu không có bài kiểm tra với MaDe này
            if (existingTests.empty) {
                const docRef = await addDoc(collection(db, 'test'), testData);
                testSavedRef.current = true; // Mark the test as saved
                console.log('Đã lưu bài kiểm tra vào Firestore:', { id: docRef.id, ...testData });
            } else {
                console.log('Bài kiểm tra với MaDe này đã tồn tại, không lưu lại');
                testSavedRef.current = true; // Mark the test as saved
            }
        } catch (error) {
            console.error('Lỗi khi lưu bài kiểm tra vào Firestore:', error);
            throw new Error('Đã xảy ra lỗi khi lưu bài kiểm tra. Vui lòng thử lại sau.');
        }
    };

    // Tạo câu hỏi khi vào trang
    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const generateQuestions = async () => {
            // Kiểm tra xem state có tồn tại và hợp lệ không
            if (!state || !state.creationMethod || !state.subject || !state.difficulty || !state.questionCount) {
                if (isMounted) {
                    setErrorMessage('Dữ liệu không hợp lệ. Vui lòng quay lại và tạo bài kiểm tra mới.');
                }
                return;
            }

            try {
                let generatedQuestions = [];

                if (state.creationMethod === 'ai') {
                    // Tạo câu hỏi bằng AI
                    generatedQuestions = Array.from({ length: state.questionCount }, (_, index) => ({
                        MaMH: state.subject,
                        NoiDungCauHoi: `Câu ${index + 1}: Câu hỏi AI môn ${state.subject} (Độ khó: ${
                            state.difficulty
                        })`,
                        PhanLoai: state.difficulty,
                        CauTraLoi: [
                            { IsCorrect: true, NoiDung: 'A' },
                            { IsCorrect: false, NoiDung: 'B' },
                            { IsCorrect: false, NoiDung: 'C' },
                            { IsCorrect: false, NoiDung: 'D' },
                        ],
                    }));
                } else if (state.creationMethod === 'bank') {
                    // Lấy câu hỏi từ ngân hàng câu hỏi (Firestore)
                    const questionsSnapshot = await getDocs(collection(db, 'questions'));
                    const allQuestions = questionsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    // Lọc câu hỏi theo MaMH và PhanLoai
                    const difficultyMap = {
                        easy: 'Dễ',
                        medium: 'Trung bình',
                        hard: 'Khó',
                    };
                    const mappedDifficulty = difficultyMap[state.difficulty.toLowerCase()] || state.difficulty;

                    const filteredQuestions = allQuestions.filter(
                        (q) => q.MaMH === state.subject && q.PhanLoai.toLowerCase() === mappedDifficulty.toLowerCase(),
                    );

                    // Kiểm tra xem có câu hỏi nào phù hợp không
                    if (filteredQuestions.length === 0) {
                        if (isMounted) {
                            setErrorMessage(
                                'Không đủ câu hỏi trong ngân hàng để random. Vui lòng thử lại với lựa chọn khác.',
                            );
                        }
                        return;
                    }

                    // Random câu hỏi
                    const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
                    generatedQuestions = shuffledQuestions.slice(0, state.questionCount);

                    // Nếu số lượng câu hỏi không đủ
                    if (generatedQuestions.length < state.questionCount) {
                        if (isMounted) {
                            setErrorMessage(
                                `Chỉ tìm thấy ${generatedQuestions.length} câu hỏi, không đủ ${state.questionCount} câu như yêu cầu.`,
                            );
                        }
                        return;
                    }
                }

                // Chỉ lưu bài kiểm tra nếu tạo đề thành công (số lượng câu hỏi đủ)
                if (generatedQuestions.length === state.questionCount && isMounted) {
                    await saveTestToFirestore(generatedQuestions);
                }

                if (isMounted) {
                    setQuestions(generatedQuestions);
                }
            } catch (error) {
                console.error('Lỗi khi tạo câu hỏi:', error);
                if (isMounted) {
                    setErrorMessage(error.message || 'Đã xảy ra lỗi khi tạo bài kiểm tra. Vui lòng thử lại sau.');
                }
            }
        };

        generateQuestions();

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
        };
    }, [state, user]); // Dependencies remain the same

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
        // Reset the refs when navigating away
        testSavedRef.current = false;
        maDeRef.current = null;
        navigate('/multiple-choice');
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

                {/* Hiển thị thông tin khoa và môn học */}
                {state && state.specialtyName && state.subjectName && (
                    <div className={cx('info')}>
                        <p className={cx('faculty')}>Khoa: {state.specialtyName}</p> |
                        <p className={cx('subject')}>Môn: {state.subjectName}</p> |
                        <p className={cx('subject')}>Số câu: {state.questionCount}</p> |
                        <p className={cx('subject')}>Thời gian: {state.testTime} phút</p>
                    </div>
                )}
            </div>

            {/* Hiển thị thông báo lỗi nếu có */}
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
