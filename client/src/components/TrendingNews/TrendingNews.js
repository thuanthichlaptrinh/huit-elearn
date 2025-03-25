import React from 'react';
import classNames from 'classnames/bind';
import styles from './TrendingNews.module.scss';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/student-photo.png';

const cx = classNames.bind(styles);

function TrendingNews() {
    // Mock data
    const news = Array(5)
        .fill()
        .map((_, index) => ({
            id: `news-${index}`,
            image: avatar,
            date: '12/03/2024',
            views: 1892 + index * 35,
            title:
                index === 0
                    ? 'Cập nhật tài liệu mới nhất'
                    : index === 1
                    ? 'Hướng dẫn sử dụng thư viện số'
                    : index === 2
                    ? 'Tài liệu học tập được sinh viên tìm kiếm nhiều nhất fdasfsdfsd'
                    : index === 3
                    ? 'Mẹo quản lý và sắp xếp tài liệu hiệu quả'
                    : 'Các chủ đề nghiên cứu hot hiện nay',
        }));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('news-container')}>
                {news.map((item) => (
                    <div key={item.id} className={cx('news-item')}>
                        <div className={cx('news-image')}>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className={cx('news-meta')}>
                            <div className={cx('meta-item')}>
                                <img src="/images/Clock.svg" alt="" /> {item.date}
                            </div>
                            <div className={cx('meta-item')}>
                                <img src="/images/Eye.svg" alt="" /> {item.views}
                            </div>
                        </div>
                        <Link to={`/news/${item.id}`} className={cx('news-title')}>
                            <span>{item.title}</span>
                        </Link>
                    </div>
                ))}
            </div>

            <div className={cx('view-all')}>
                <Link to="/news" className={cx('view-all-btn')}>
                    Xem tất cả <img src="/images/Arrow_Right.svg" alt=" " />
                </Link>
            </div>
        </div>
    );
}

export default TrendingNews;
