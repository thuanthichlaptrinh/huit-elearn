import React, { useState } from 'react';
import { Container, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './CreateTest.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CreateTest = () => {
    const [formData, setFormData] = useState({
        specialty: '',
        subject: '',
        chapter: '',
        difficulty: '',
        questionCount: '',
        testTime: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Test creation data:', formData);
    };

    // Custom MenuProps to prevent layout shift
    const menuProps = {
        PaperProps: {
            style: {
                width: 'auto', // Ensures the dropdown width matches the select
            },
        },
        disableScrollLock: true, // Prevents scroll lock which can cause shifting
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="#">Tạo bài kiểm tra ngẫu nhiên</Link>
            </div>
            <Container className={cx('form-test')}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        paddingBottom: 4,
                        paddingTop: 4,
                        paddingLeft: 6,
                        paddingRight: 6,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: '#EEEEFE',
                    }}
                >
                    <h3 className={cx('title')}>Tạo bài kiểm tra ngẫu nhiên</h3>

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)', // Màu label mặc định
                                '&.Mui-focused': {
                                    color: '#00008b', // Màu label khi focus
                                },
                            }}
                        >
                            Khoa chuyên ngành
                        </InputLabel>
                        <Select
                            name="specialty"
                            value={formData.specialty}
                            label="Khoa chuyên ngành"
                            onChange={handleChange}
                            MenuProps={menuProps}
                            sx={{
                                backgroundColor: '#fff',

                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00008b', // Màu viền khi focus
                                    borderWidth: '2px', // Tăng độ dày viền khi focus (tuỳ chọn)
                                },
                            }}
                        >
                            <MenuItem value="cntt">Công nghệ thông tin</MenuItem>
                            <MenuItem value="kinhte">Kinh tế</MenuItem>
                            <MenuItem value="marketing">Marketing</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)', // Màu label mặc định
                                '&.Mui-focused': {
                                    color: '#00008b', // Màu label khi focus
                                },
                            }}
                        >
                            Môn học
                        </InputLabel>
                        <Select
                            name="subject"
                            value={formData.subject}
                            label="Môn học"
                            onChange={handleChange}
                            MenuProps={menuProps}
                            sx={{
                                backgroundColor: '#fff',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00008b', // Màu viền khi focus
                                    borderWidth: '2px', // Tăng độ dày viền khi focus (tuỳ chọn)
                                },
                            }}
                        >
                            <MenuItem value="laptrinhweb">Lập trình web</MenuItem>
                            <MenuItem value="cautrucdulieuthuattoan">Cấu trúc dữ liệu và thuật toán</MenuItem>
                            <MenuItem value="kinhtevimomacro">Kinh tế vi mô và macro</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)', // Màu label mặc định
                                '&.Mui-focused': {
                                    color: '#00008b', // Màu label khi focus
                                },
                            }}
                        >
                            Chương
                        </InputLabel>
                        <Select
                            name="chapter"
                            value={formData.chapter}
                            label="Chương"
                            onChange={handleChange}
                            MenuProps={menuProps}
                            sx={{
                                backgroundColor: '#fff',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00008b', // Màu viền khi focus
                                    borderWidth: '2px', // Tăng độ dày viền khi focus (tuỳ chọn)
                                },
                            }}
                        >
                            <MenuItem value="chapter1">Chương 1</MenuItem>
                            <MenuItem value="chapter2">Chương 2</MenuItem>
                            <MenuItem value="chapter3">Chương 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                                color: 'rgba(0, 0, 0, 0.6)', // Màu label mặc định
                                '&.Mui-focused': {
                                    color: '#00008b', // Màu label khi focus
                                },
                            }}
                        >
                            Độ khó
                        </InputLabel>
                        <Select
                            name="difficulty"
                            value={formData.difficulty}
                            label="Độ khó"
                            onChange={handleChange}
                            MenuProps={menuProps}
                            sx={{
                                backgroundColor: '#fff',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#00008b', // Màu viền khi focus
                                    borderWidth: '2px', // Tăng độ dày viền khi focus (tuỳ chọn)
                                },
                            }}
                        >
                            <MenuItem value="easy">Dễ</MenuItem>
                            <MenuItem value="medium">Trung bình</MenuItem>
                            <MenuItem value="hard">Khó</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        name="questionCount"
                        label="Số lượng câu hỏi"
                        type="number"
                        value={formData.questionCount}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)', // Viền mặc định
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.87)', // Viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#00008b', // Màu viền khi focus
                                    borderWidth: '2px',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(0, 0, 0, 0.6)', // Màu label mặc định
                                '&.Mui-focused': {
                                    color: '#00008b', // Màu label khi focus
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        name="testTime"
                        label="Thiết lập thời gian (phút)"
                        type="number"
                        value={formData.testTime}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.87)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#00008b',
                                    borderWidth: '2px',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(0, 0, 0, 0.6)',
                                '&.Mui-focused': {
                                    color: '#00008b',
                                },
                            },
                        }}
                    />

                    <button className={cx('btn-submit')}>Tiếp tục</button>
                </Box>
            </Container>
        </div>
    );
};

export default CreateTest;
