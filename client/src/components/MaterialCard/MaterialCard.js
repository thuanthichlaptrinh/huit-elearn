import React from 'react';
import classNames from 'classnames/bind';
import styles from './MaterialCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MaterialCard({ data, type = 'document' }) {
    const { id, image, title, subject, facultyName } = data;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('card')}>
                <div className={cx('card-image')}>
                    <img src={image} alt={title} onError={(e) => (e.target.src = '/images/no-image.jpg')} />
                    {type === 'document' && <span className={cx('label')}>hot</span>}
                    <button className={cx('favorite')}>
                        <img src="/images/Action_Add_favourite.svg" alt="Add to favorite" />
                    </button>
                </div>

                <div className={cx('card-info')}>
                    <Link
                        to={`/filterSubject?course=${encodeURIComponent(facultyName)}`} // Chuyển hướng đến FilterSubject với course=facultyName
                        className={cx('card-faculty')}
                    >
                        {facultyName}
                    </Link>
                    <Link
                        to={
                            type === 'document'
                                ? `/material/${id}`
                                : `/filterSubject?keyword=${encodeURIComponent(title)}`
                        }
                        className={cx('card-title')}
                    >
                        {title}
                    </Link>

                    {type === 'document' && (
                        <>
                            <div className={cx('card-details')}>
                                <span className={cx('detail-label')}>Môn</span>
                                <Link
                                    to={`/filterDepartment?subject=${encodeURIComponent(
                                        subject.name,
                                    )}&course=${encodeURIComponent(facultyName)}`}
                                    className={cx('detail-value')}
                                >
                                    {subject.name}
                                </Link>
                            </div>
                            <div className={cx('card-format')}>{data.type}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MaterialCard;
