import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('footer-content')}>
                    <div className={cx('footer-column', 'footer-info')}>
                        <h3 className={cx('column-title')}>Thông tin</h3>

                        <div className={cx('column-content')}>
                            <div className={cx('footer-brand')}>HUIT E-LEARN</div>

                            <div className={cx('contact-item')}>
                                <img src="/images/Phone.svg" alt="" />
                                <span>Điện thoại: 079 432 6604</span>
                            </div>
                            <div className={cx('contact-item')}>
                                <img src="/images/Gmail.svg" alt="" />
                                <span>E-mail: huitelearn@gmail.com</span>
                            </div>
                            <div className={cx('contact-item')}>
                                <img src="/images/Pin.svg" alt="" />
                                <span>Địa chỉ: 140 Lê Trọng Tấn, Tân Phú</span>
                            </div>
                            <div className={cx('social-links')}>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cx('social-link')}
                                >
                                    <img src="/images/zalo.svg" alt="" />
                                </a>
                                <a
                                    href="https://www.facebook.com/thuanthichlaptrinh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cx('social-link')}
                                >
                                    <img src="/images/Facebook.svg" alt="" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@thuanthichlaptrinh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cx('social-link')}
                                >
                                    <img src="/images/Youtube.svg" alt="" />
                                </a>

                                <a
                                    href="https://www.tiktok.com/@thuanthichlaptrinh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cx('social-link')}
                                >
                                    <img src="/images/Tiktok.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={cx('footer-column')}>
                        <h3 className={cx('column-title')}>Khoa chuyên ngành</h3>
                        <div className={cx('column-content', 'column-links', 'column-khoa')}>
                            <div>
                                <Link to="/faculty/cntt" className={cx('footer-link')}>
                                    CNTT
                                </Link>
                                <Link to="/faculty/tm" className={cx('footer-link')}>
                                    TM
                                </Link>
                                <Link to="/faculty/cntp" className={cx('footer-link')}>
                                    CNTP
                                </Link>
                                <Link to="/faculty/qtkd" className={cx('footer-link')}>
                                    QTKD
                                </Link>
                            </div>
                            <div>
                                <Link to="/faculty/cnhh" className={cx('footer-link')}>
                                    CNHH
                                </Link>
                                <Link to="/faculty/cnm" className={cx('footer-link')}>
                                    CNM
                                </Link>
                                <Link to="/faculty/ck" className={cx('footer-link')}>
                                    CK
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className={cx('footer-column')}>
                        <h3 className={cx('column-title')}>Liên kết nhanh</h3>
                        <div className={cx('column-content', 'column-links')}>
                            <Link to="/news" className={cx('footer-link')}>
                                Tin tức
                            </Link>
                            <Link to="/contact" className={cx('footer-link')}>
                                Liên hệ
                            </Link>
                            <Link to="/favorite" className={cx('footer-link')}>
                                Yêu thích
                            </Link>
                            <Link to="/search" className={cx('footer-link')}>
                                Tìm kiếm
                            </Link>
                            <Link to="/account" className={cx('footer-link')}>
                                Tài khoản
                            </Link>
                        </div>
                    </div>

                    <div className={cx('footer-column')}>
                        <h3 className={cx('column-title')}>Chính sách</h3>
                        <div className={cx('column-content', 'column-links')}>
                            <Link to="/privacy" className={cx('footer-link')}>
                                Bảo mật
                            </Link>
                            <Link to="/terms" className={cx('footer-link')}>
                                Điều khoản
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
