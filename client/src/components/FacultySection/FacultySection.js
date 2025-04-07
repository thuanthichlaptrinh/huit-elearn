import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FacultySection.module.scss';

const cx = classNames.bind(styles);

function FacultySection({ faculties }) {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        draggable: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        centerPadding: '20px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    draggable: true,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    draggable: true,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                    swipeToSlide: true,
                },
            },
        ],
    };

    if (!faculties || faculties.length === 0) {
        return (
            <section className={cx('wrapper')}>
                <h2 className={cx('title')}>
                    <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
                </h2>
                <p>Không có khoa nào để hiển thị.</p>
            </section>
        );
    }

    return (
        <section className={cx('wrapper')}>
            <h2 className={cx('title')}>
                <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
            </h2>

            <div className={cx('faculties-carousel')}>
                <div className={cx('carousel-list')}>
                    <Slider {...settings} ref={sliderRef}>
                        {faculties.map((faculty) => (
                            <div key={faculty.id} className={cx('carousel-item')}>
                                <Link className={cx('faculty-item')} to={`/faculty/${faculty.MaKhoa}`}>
                                    <div className={cx('faculty-logo')}>
                                        <img
                                            src={faculty.image}
                                            alt={faculty.TenKhoa}
                                            onError={(e) => {
                                                e.target.src = '/images/default-logo.png';
                                            }}
                                        />
                                    </div>
                                    <div className={cx('faculty-name')}>{faculty.TenKhoa}</div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default FacultySection;
// import React, { useState, useEffect, useRef } from 'react';
// import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
// import { db } from '../../firebase/config';
// import { collection, getDocs } from 'firebase/firestore';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styles from './FacultySection.module.scss';

// const cx = classNames.bind(styles);

// // Lấy dữ liệu từ localStorage (nếu có)
// const getCachedFaculties = () => {
//     const cached = localStorage.getItem('cachedFaculties');
//     return cached ? JSON.parse(cached) : null;
// };

// // Lưu dữ liệu vào localStorage
// const setCachedFaculties = (data) => {
//     localStorage.setItem('cachedFaculties', JSON.stringify(data));
// };

// // Khởi tạo cachedFaculties từ localStorage
// let cachedFaculties = getCachedFaculties();

// function FacultySection() {
//     const [faculties, setFaculties] = useState(cachedFaculties || []);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const sliderRef = useRef(null);

//     useEffect(() => {
//         if (cachedFaculties) {
//             setFaculties(cachedFaculties);
//             setLoading(false);
//             return;
//         }

//         const fetchFaculties = async () => {
//             try {
//                 setLoading(true);
//                 console.log('Bắt đầu lấy dữ liệu từ Firestore...');
//                 const facultiesCollection = collection(db, 'faculties');
//                 const facultiesSnapshot = await getDocs(facultiesCollection);
//                 console.log('Số lượng document:', facultiesSnapshot.size);

//                 const facultiesList = facultiesSnapshot.docs.map((doc) => {
//                     const data = doc.data();
//                     console.log('Dữ liệu của document:', data);

//                     return {
//                         id: doc.id,
//                         MaKhoa: data.MaKhoa || 'unknown',
//                         TenKhoa: data.TenKhoa || 'Khoa không xác định',
//                         AnhKhoa: data.AnhKhoa || '/images/no-image.jpg',
//                         GioiThieu: data.GioiThieu || '',
//                     };
//                 });

//                 if (facultiesList.length === 0) {
//                     setError('Không tìm thấy khoa nào trong cơ sở dữ liệu.');
//                 } else {
//                     setFaculties(facultiesList);
//                     cachedFaculties = facultiesList;
//                     setCachedFaculties(facultiesList);
//                 }
//                 setLoading(false);
//             } catch (err) {
//                 setError('Không thể tải danh sách khoa. Vui lòng thử lại sau.');
//                 setLoading(false);
//                 console.error('Lỗi khi lấy dữ liệu khoa:', err);
//             }
//         };

//         fetchFaculties();
//     }, []);

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         arrows: false,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         draggable: true,
//         swipeToSlide: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         centerPadding: '20px',
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: false,
//                     draggable: true,
//                     swipeToSlide: true,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     draggable: true,
//                     swipeToSlide: true,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     draggable: true,
//                     swipeToSlide: true,
//                 },
//             },
//         ],
//     };

//     if (loading) {
//         return (
//             <section className={cx('wrapper')}>
//                 <h2 className={cx('title')}>
//                     <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
//                 </h2>
//                 <p>Đang tải...</p>
//             </section>
//         );
//     }

//     if (error) {
//         return (
//             <section className={cx('wrapper')}>
//                 <h2 className={cx('title')}>
//                     <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
//                 </h2>
//                 <p>{error}</p>
//             </section>
//         );
//     }

//     return (
//         <section className={cx('wrapper')}>
//             <h2 className={cx('title')}>
//                 <span className={cx('highlight')}>CÁC KHOA</span> CHUYÊN NGÀNH
//             </h2>

//             <div className={cx('faculties-carousel')}>
//                 {faculties.length > 0 ? (
//                     <div className={cx('carousel-list')}>
//                         <Slider {...settings} ref={sliderRef}>
//                             {faculties.map((faculty) => (
//                                 <div key={faculty.id} className={cx('carousel-item')}>
//                                     <Link className={cx('faculty-item')} to={`/faculty/${faculty.MaKhoa}`}>
//                                         <div className={cx('faculty-logo')}>
//                                             <img
//                                                 src={faculty.AnhKhoa}
//                                                 alt={faculty.TenKhoa}
//                                                 onError={(e) => {
//                                                     e.target.src = '/images/default-logo.png';
//                                                 }}
//                                             />
//                                         </div>
//                                         <div className={cx('faculty-name')}>{faculty.TenKhoa}</div>
//                                     </Link>
//                                 </div>
//                             ))}
//                         </Slider>
//                     </div>
//                 ) : (
//                     <p>Không có khoa nào để hiển thị.</p>
//                 )}
//             </div>
//         </section>
//     );
// }

// export default FacultySection;
