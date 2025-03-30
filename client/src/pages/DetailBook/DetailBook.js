import React from 'react';
import classNames from 'classnames/bind';
import styles from './DetailBook.module.scss';

const cx = classNames.bind(styles);

function DetailBook() {
    // Dữ liệu giả lập (bạn có thể thay bằng dữ liệu từ API)
    const bookData = {
        title: 'Giới thiệu lập trình di động',
        fileType: 'PPT', // Có thể là 'PDF', 'Word', 'Excel', hoặc 'PPT'
        description:
            'Lập trình di động là lĩnh vực phát triển ứng dụng cho các thiết bị như điện thoại thông minh, máy tính bảng, hoạt động trên các nền tảng phổ biến như Android và iOS. Các ứng dụng có thể được phát triển theo phương pháp native (sử dụng ngôn ngữ chính thức của hệ điều hành), đa nền tảng (Flutter, React Native) hoặc ứng dụng web di động. Với sự phát triển mạnh mẽ của công nghệ, lập trình di động trở thành một lĩnh vực quan trọng, mở ra nhiều cơ hội cho các nhà phát triển và doanh nghiệp trong thời đại số.',
        department: 'Khoa Công nghệ Thông tin - CÔNG NGHỆ PHẦN MỀM (SOFTWARE ENGINEERING)',
        courseInfo: {
            program: 'Chương trình học: 3 Tín chỉ (45 Tiết)',
            content: [
                'Chương 1. Tổng quan về công nghệ phần mềm',
                'Chương 2. Quản lý dự án phần mềm',
                'Chương 3. Khao sát hiện trạng, phân tích và đặc tả các yêu cầu',
                'Chương 4. Thiết kế phần mềm',
                'Chương 5. Lập trình phần mềm',
                'Chương 6. Kiểm thử phần mềm và triển khai, bảo trì phần mềm',
            ],
        },
        lecturerInfo: {
            title: 'Giảng viên giảng dạy:',
            lecturers: [
                'Roger S. Pressman, Bruce R. Maxim, Software Engineering: A Practitioner’s Approach (9th ed.), McGraw-Hill, 2020.',
                'Ian Sommerville (2016), Software Engineering (10th ed.), ISBN 978-1-292-09613-1, Addison Wesley.',
                'A project of the IEEE Computer Society Professional Practices Committee, Guide to the Software Engineering Body of Knowledge – SWEBOK, 2014.',
            ],
        },
        goals: {
            title: 'Mục tiêu:',
            items: [
                'Trình bày và giải thích được các khái niệm cơ bản về ngành lập trình phần mềm (khái niệm, đặc điểm, các bước cơ bản trong lập trình phần mềm, các phương pháp phát triển phần mềm, các mô hình phát triển phần mềm, các công cụ hỗ trợ phát triển phần mềm, các kỹ thuật kiểm thử phần mềm, các kỹ thuật bảo trì phần mềm).',
            ],
        },
        email: 'Google classroom: DD',
    };

    // Hàm để hiển thị nhãn định dạng
    const renderFileTypeLabel = (fileType) => {
        const labelStyles = {
            PDF: 'pdf-label',
            Word: 'word-label',
            Excel: 'excel-label',
            PPT: 'ppt-label',
        };

        return <span className={cx(labelStyles[fileType] || 'pdf-label')}>{fileType}</span>;
    };

    return (
        <div className={cx('detail-book')}>
            {/* Phần giới thiệu */}
            <div className={cx('introduction')}>
                <h1 className={cx('title')}>{bookData.title}</h1>
                <div className={cx('format')}>{renderFileTypeLabel(bookData.fileType)}</div>
            </div>

            {/* Phần mô tả */}
            <div className={cx('description')}>
                <h3>Mô tả</h3>
                <p>{bookData.description}</p>
            </div>

            {/* Hình ảnh chung về tài liệu */}
            <div className={cx('file-preview')}>
                <h3>Hình ảnh chung về tài liệu</h3>
                <div className={cx('document-image')}>
                    <img src="/images/cntt-pdf.svg" alt="Document Preview" />
                </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className={cx('info-section')}>
                <div className={cx('info-block')}>
                    <h3>{bookData.department}</h3>
                    <h4>Giới thiệu học phần</h4>
                    <ul>
                        <li>
                            <strong>Chương trình học:</strong> {bookData.courseInfo.program}
                        </li>
                        <li>
                            <strong>Nội dung:</strong>
                        </li>
                        <ul>
                            {bookData.courseInfo.content.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </ul>
                </div>

                <div className={cx('info-block')}>
                    <h3>{bookData.department}</h3>
                    <h4>Tài liệu tham khảo:</h4>
                    <ul>
                        {bookData.lecturerInfo.lecturers.map((lecturer, index) => (
                            <li key={index}>{lecturer}</li>
                        ))}
                    </ul>
                </div>

                <div className={cx('info-block')}>
                    <h3>{bookData.department}</h3>
                    <h4>{bookData.goals.title}</h4>
                    <ul>
                        {bookData.goals.items.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                </div>

                <div className={cx('info-block')}>
                    <h3>{bookData.department}</h3>
                    <h4>Giảng viên giảng dạy:</h4>
                    <ul>
                        <li>
                            <strong>Email:</strong> {bookData.email}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Nút chức năng */}
            <div className={cx('actions')}>
                <button className={cx('report-btn')}>Báo cáo</button>
                <button className={cx('download-btn')}>Tải xuống</button>
            </div>

            {/* Phần bình luận */}
            <div className={cx('comments')}>
                <h3>Bình luận (2)</h3>
                <div className={cx('comment')}>
                    <img src="https://via.placeholder.com/40" alt="User avatar" />
                    <div className={cx('comment-content')}>
                        <p>
                            <strong>Huỳnh Thị Gấm</strong> - 20/08/2024 lúc 16:55
                        </p>
                        <p>Hữu ích lắm ạ!</p>
                        <div className={cx('comment-actions')}>
                            <span>1 Lượt thích</span>
                            <span>Thích</span>
                            <span>Trả lời</span>
                        </div>
                    </div>
                </div>
                <div className={cx('comment')}>
                    <img src="https://via.placeholder.com/40" alt="User avatar" />
                    <div className={cx('comment-content')}>
                        <p>
                            <strong>Vũ Thiên</strong> - 18/08/2024 lúc 12:47
                        </p>
                        <p>Chào mình hỏi là có ai ổn tài liệu này chưa ạ ?</p>
                        <div className={cx('comment-actions')}>
                            <span>1 Lượt thích</span>
                            <span>Thích</span>
                            <span>Trả lời</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBook;
