import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UploadDocument.module.scss';
import classNames from 'classnames/bind';
import InputField from '../../components/InputField/InputField';
import { formatFileSize } from '../../utils/fileUtils';

const cx = classNames.bind(styles);

const UploadDocument = () => {
    const [step, setStep] = useState('upload'); // 'upload' or 'confirm'
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        khoa: '',
        mon: '',
        tenTaiLieu: '',
        moTa: '',
    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation: Ensure all fields are filled
        if (!file || !formData.khoa || !formData.mon || !formData.tenTaiLieu || !formData.moTa) {
            alert('Vui lòng điền đầy đủ thông tin và chọn tệp để tải lên.');
            return;
        }

        // Move to confirmation step
        setStep('confirm');
    };

    const handleConfirmUpload = () => {
        // Simulate an upload process (you can replace this with an actual API call)
        console.log('Uploading file:', file);
        console.log('Form data:', formData);

        // After successful upload, reset the form and go back to the upload step
        alert('Tài liệu đã được đăng tải thành công!');
        setFile(null);
        setFormData({
            khoa: '',
            mon: '',
            tenTaiLieu: '',
            moTa: '',
        });
        setStep('upload');
    };

    const handleCancel = () => {
        // Go back to the upload step
        setStep('upload');
    };

    // Sample options for Khoa and Môn
    const khoaOptions = [
        { value: '', label: 'Theo kiếm theo khoa' },
        { value: 'cong-nghe-thong-tin', label: 'Công nghệ Thông tin' },
        { value: 'kinh-te', label: 'Kinh tế' },
        { value: 'co-khi', label: 'Cơ khí' },
    ];

    const monOptions = [
        { value: '', label: 'Theo kiếm theo môn' },
        { value: 'cong-nghe-phan-mem', label: 'Công nghệ phần mềm' },
        { value: 'mang-may-tinh', label: 'Mạng máy tính' },
        { value: 'tri-tue-nhan-tao', label: 'Trí tuệ nhân tạo' },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="#">Tài khoản</Link> / <Link to="#">Tài liệu</Link>
                {step === 'confirm' && ' / Xác nhận đăng tải'}
            </div>

            {step === 'upload' ? (
                <div className={cx('upload')}>
                    {/* Upload Section */}
                    <div className={cx('upload-section')}>
                        <h3>Tải lên các tập tin của bạn</h3>
                        <p>Bạn có thể tải lên tối đa 1 tệp mỗi lần</p>

                        <label className={cx('upload-box')}>
                            <img src="/images/upload.svg" alt="Upload" />
                            <p>Kéo tập tin của bạn để bắt đầu tải lên</p>
                            <input type="file" onChange={handleFileChange} hidden />
                            <div className={cx('separator')}>Hoặc</div>
                            <button
                                className={cx('browse-files-btn')}
                                onClick={() => document.querySelector("input[type='file']").click()}
                            >
                                Duyệt tập tin
                            </button>
                        </label>
                    </div>

                    {/* Document Info Section */}
                    <div className={cx('info-section')}>
                        {file && (
                            <div className={cx('file-preview')}>
                                <div className={cx('file-item')}>
                                    <div className={cx('file-icon')}>
                                        <img src="/images/upload.svg" alt="" />
                                        <div className={cx('file-info')}>
                                            <p className={cx('file-name')}>{file.name}</p>
                                            <span className={cx('file-size')}>{formatFileSize(file.size)}</span>
                                        </div>
                                    </div>
                                    <button className={cx('remove-file')} onClick={handleRemoveFile}>
                                        <img src="/images/remove-file.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                        )}

                        <h3>Thông tin tài liệu</h3>

                        {/* Khoa as HTML Select */}
                        <div className={cx('input-group')}>
                            <label>
                                Khoa <span className={cx('required')}>*</span>
                            </label>
                            <select
                                name="khoa"
                                value={formData.khoa}
                                onChange={handleInputChange}
                                required
                                className={cx('select-field')}
                            >
                                {khoaOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Môn as HTML Select */}
                        <div className={cx('input-group')}>
                            <label>
                                Môn <span className={cx('required')}>*</span>
                            </label>
                            <select
                                name="mon"
                                value={formData.mon}
                                onChange={handleInputChange}
                                required
                                className={cx('select-field')}
                            >
                                {monOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tên tài liệu and Mô tả remain as InputField */}
                        <div className={cx('input-group')}>
                            <InputField
                                label="Tên tài liệu"
                                placeholder="Giáo trình giảng dạy"
                                name="tenTaiLieu"
                                value={formData.tenTaiLieu}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={cx('input-group')}>
                            <InputField
                                label="Mô tả"
                                placeholder="Mô tả tài liệu"
                                name="moTa"
                                value={formData.moTa}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button className={cx('submit-btn')} onClick={handleSubmit}>
                            Đăng tải
                        </button>
                    </div>
                </div>
            ) : (
                <div className={cx('confirm-section')}>
                    <div className={cx('file-preview')}>
                        <div className={cx('file-item')}>
                            <div className={cx('file-icon')}>
                                <img src="/images/upload.svg" alt="File" />
                                <div className={cx('file-info')}>
                                    <p className={cx('file-name')}>{file.name}</p>
                                    <span className={cx('file-size')}>{formatFileSize(file.size)}</span>
                                </div>
                            </div>
                            <button className={cx('remove-file')} onClick={handleRemoveFile}>
                                <img src="/images/remove-file.svg" alt="" />
                            </button>
                        </div>
                    </div>

                    <div className={cx('info-section')}>
                        <h4>Thông tin tài liệu</h4>
                        <div className={cx('info-item')}>
                            <InputField label="Khoa" value={formData.khoa} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <InputField label="Môn" value={formData.mon} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <InputField label="Tên tài liệu" value={formData.tenTaiLieu} readOnly />
                        </div>
                        <div className={cx('info-item')}>
                            <InputField label="Mô tả" value={formData.moTa} readOnly />
                        </div>
                    </div>

                    <div className={cx('button-group')}>
                        <button className={cx('confirm-btn')} onClick={handleConfirmUpload}>
                            Đăng tải
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDocument;
