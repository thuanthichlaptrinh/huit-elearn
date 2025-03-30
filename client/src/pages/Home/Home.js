import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchBar from '../../layouts/components/SearchBar';
import FacultySection from '../../components/FacultySection/FacultySection';
import MaterialsList from '../../components/MaterialsList/MaterialsList';
import AccessSteps from '../../components/AccessSteps/AccessSteps';
import TrendingKeywords from '../../components/TrendingKeywords/TrendingKeywords';
import TrendingNews from '../../components/TrendingNews/TrendingNews';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('banner-content')}>
                    <h1 className={cx('banner-title')}>
                        TÌM KIẾM TÀI LIỆU VÀ TẠO BÀI KIỂM TRA
                        <br />
                        TẠI <span className={cx('highlight')}>HUIT E-LEARN</span>
                    </h1>
                    <p className={cx('banner-subtitle')}>
                        Trang web chính thức của trường Đại học Công thương TP. Hồ Chí Minh
                    </p>
                </div>
                <div className={cx('banner-search')}>
                    <div>
                        <SearchBar />
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <FacultySection />

                <section className={cx('section')}>
                    <h2 className={cx('section-title')}>
                        Tài liệu <span className={cx('highlight')}>nổi bật</span>
                    </h2>

                    <MaterialsList />
                </section>

                <AccessSteps />

                <section className={cx('section')}>
                    <h2 className={cx('section-title')}>
                        Có <span className={cx('highlight')}>999</span> môn học có tài liệu
                    </h2>
                    <MaterialsList />
                </section>

                <TrendingKeywords />

                <section className={cx('section')}>
                    <h2 className={cx('section-title')} style={{ textAlign: 'center' }}>
                        TIN TỨC <span className={cx('highlight')}>NỔI BẬT</span>
                    </h2>
                    <TrendingNews />
                </section>
            </div>
        </div>
    );
}

export default Home;
