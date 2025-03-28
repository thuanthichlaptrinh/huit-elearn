import React, { useState } from 'react';
import styles from './UploadDocument.module.scss';
import classNames from 'classnames/bind';
import InputField from '../../components/InputField/InputField';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const UploadDocument = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="#">Thêm tài liệu</Link>
            </div>
            <div className={cx('upload')}>
                {/* Khu vực tải lên */}
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

                {/* Khu vực thông tin tài liệu */}
                <div className={cx('info-section')}>
                    <h3>Thông tin tài liệu</h3>

                    <div className={cx('input-group')}>
                        <InputField label="Khoa" placeholder="Tìm kiếm theo khoa" required />
                    </div>

                    <div className={cx('input-group')}>
                        <InputField label="Môn" placeholder="Tìm kiếm theo môn" required />
                    </div>

                    <div className={cx('input-group')}>
                        <InputField label="Thêm tài liệu" placeholder="Nhập tên tài liệu" required />
                    </div>

                    <div className={cx('input-group')}>
                        <InputField label="Mô tả" placeholder="Nhập mô tả tài liệu" required />
                    </div>

                    <button className={cx('submit-btn')}>Tiếp tục</button>
                </div>
            </div>
        </div>
    );
};

export default UploadDocument;
