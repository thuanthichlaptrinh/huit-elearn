import React from 'react';
import classNames from 'classnames/bind';
import styles from './MaterialCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MaterialCard({ data }) {
    const { id, image, title, subject, faculty, type } = data;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('card')}>
                <div className={cx('card-image')}>
                    <img src={image} alt={title} />
                    <span className={cx('label')}>hot</span>
                    <button className={cx('favorite')}>
                        {/* <i className="far fa-heart"></i> */}
                        <img src="/images/Action_Add_favourite.svg" alt="" />
                    </button>
                </div>

                <div className={cx('card-info')}>
                    <div className={cx('card-faculty')}>{faculty}</div>
                    <Link to={`/material/${id}`} className={cx('card-title')}>
                        {title}
                    </Link>
                    <div className={cx('card-details')}>
                        <span className={cx('detail-label')}>Môn</span>
                        <Link to={`/subject/${subject.id}`} className={cx('detail-value')}>
                            {subject.name}
                        </Link>
                    </div>
                    <div className={cx('card-format')}>{type}</div>
                </div>
            </div>
        </div>
    );
}

export default MaterialCard;
