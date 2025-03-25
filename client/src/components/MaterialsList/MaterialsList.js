import React from 'react';
import classNames from 'classnames/bind';
import styles from './MaterialsList.module.scss';
import { Link } from 'react-router-dom';
import MaterialCard from '../MaterialCard';

const cx = classNames.bind(styles);

function MaterialsList() {
    // Mock data
    const materials = Array(8)
        .fill()
        .map((_, index) => ({
            id: `material-${index}`,
            image: '/images/student-photo.png',
            title: 'Chương 2. Quản lý dự án phần mềm',
            subject: {
                id: 'cnpm',
                name: 'Công nghệ phần mềm',
            },
            faculty: 'Khoa Công nghệ Thông tin',
            type: 'PDF',
        }));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('materials-grid')}>
                {materials.map((material) => (
                    <div key={material.id} className={cx('grid-item')}>
                        <MaterialCard data={material} />
                    </div>
                ))}
            </div>

            <div className={cx('view-all')}>
                <Link to="/materials" className={cx('view-all-btn')}>
                    Xem tất cả
                    <img src="/images/Arrow_Right.svg" alt=" " />
                </Link>
            </div>
        </div>
    );
}

export default MaterialsList;
