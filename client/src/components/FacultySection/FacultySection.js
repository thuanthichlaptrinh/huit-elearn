import React from 'react';
import classNames from 'classnames/bind';
import styles from './FacultySection.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FacultySection() {
    const faculties = [
        {
            id: 'cntt',
            name: 'Công nghệ Thông tin',
            logo: '/images/cntt-logo.png', // Dẫn từ public
        },
        {
            id: 'cntp',
            name: 'Công nghệ Thực Phẩm',
            logo: '/images/cntp-logo.png',
        },
        {
            id: 'cnhh',
            name: 'Công nghệ Hóa Học',
            logo: '/images/cnhh-logo.png',
        },
        {
            id: 'ck',
            name: 'Cơ khí',
            logo: '/images/cokhi-logo.png',
        },
        {
            id: 'qtkd',
            name: 'Quản trị Kinh Doanh',
            logo: '/images/qtkd-logo.png',
        },
    ];

    return (
        <section className={cx('wrapper')}>
            <h2 className={cx('title')}>
                <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
            </h2>

            <div className={cx('faculties-list')}>
                {faculties.map((faculty) => (
                    <Link className={cx('faculty-item')} to={`/faculty/${faculty.id}`} key={faculty.id}>
                        <div className={cx('faculty-logo')}>
                            <img src={faculty.logo} alt={faculty.name} />
                        </div>
                        <div className={cx('faculty-name')}>{faculty.name}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default FacultySection;
