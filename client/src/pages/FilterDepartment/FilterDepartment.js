import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames/bind';
import styles from './FilterDepartment.module.scss';
import SearchBar from '../../layouts/components/SearchBar';
import CheckboxGroup from '../../components/CheckboxGroup/CheckboxGroup';
import Dropdown from '../../components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../components/Alert/Alert';
import ReportFormModal from '../../components/ReportForm/ReportForm';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

// Thời gian cache (1 giờ = 60 phút * 60 giây * 1000 milliseconds)
const CACHE_DURATION = 60 * 60 * 1000;

// Biến kiểm soát log (bật/tắt log trong môi trường production)
const ENABLE_LOGS = process.env.NODE_ENV === 'development';

const FilterDepartment = () => {
    const location = useLocation();
    const { keyword, course, subject, type } = queryString.parse(location.search);
    const [clickedItems, setClickedItems] = useState(new Set());
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRefs = useRef({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('info');
    const [showReportForm, setShowReportForm] = useState(false);
    const [reportItemId, setReportItemId] = useState(null);
    const [reportReason, setReportReason] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cachedImages, setCachedImages] = useState({});

    const options = [
        { value: 'option1', label: 'Tất cả' },
        { value: 'option2', label: 'PDF' },
        { value: 'option3', label: 'Word' },
        { value: 'option4', label: 'Excel' },
        { value: 'option5', label: 'PPT' },
    ];

    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Hàm kiểm tra và lấy dữ liệu từ localStorage
    const getCachedData = () => {
        const cached = localStorage.getItem('materialsList');
        const cachedTimestamp = localStorage.getItem('materialsListTimestamp');
        const cachedImagesData = localStorage.getItem('cachedImagesMaterials');

        if (cached && cachedTimestamp) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(cachedTimestamp, 10);

            if (timeDifference < CACHE_DURATION) {
                const materialsData = JSON.parse(cached);
                const imagesData = cachedImagesData ? JSON.parse(cachedImagesData) : {};
                setCachedImages(imagesData);
                return materialsData;
            }
        }
        return null;
    };

    // Hàm lưu dữ liệu vào localStorage
    const setCachedData = (data) => {
        localStorage.setItem('materialsList', JSON.stringify(data));
        localStorage.setItem('materialsListTimestamp', new Date().getTime().toString());
        localStorage.setItem('cachedImagesMaterials', JSON.stringify(cachedImages));
    };

    // Hàm tải và cache hình ảnh
    const cacheImage = async (imageUrl, itemId) => {
        if (cachedImages[itemId]) {
            return cachedImages[itemId];
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const reader = new FileReader();

            return new Promise((resolve) => {
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setCachedImages((prev) => ({
                        ...prev,
                        [itemId]: base64data,
                    }));
                    resolve(base64data);
                };
                reader.readAsDataURL(blob);
            });
        } catch (err) {
            if (ENABLE_LOGS) {
                console.error(`Lỗi khi tải hình ảnh ${imageUrl}:`, err);
            }
            return imageUrl;
        }
    };

    // Lấy dữ liệu từ Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Bước 1: Lấy toàn bộ faculties trước và lưu vào facultiesMap
                const facultiesCollection = collection(db, 'faculties');
                const facultiesSnapshot = await getDocs(facultiesCollection);
                const facultiesMap = {};

                facultiesSnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    facultiesMap[data.MaKhoa] = data;
                });

                // Bước 2: Lấy toàn bộ subjects và lưu vào subjectsMap
                const subjectsCollection = collection(db, 'subjects');
                const subjectsSnapshot = await getDocs(subjectsCollection);
                const subjectsMap = {};
                subjectsSnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    subjectsMap[data.MaMH] = data;
                });

                // Bước 3: Lấy danh sách tài liệu từ collection 'documents'
                const materialsCollection = collection(db, 'documents');
                const materialsSnapshot = await getDocs(materialsCollection);

                const materialsList = [];
                for (const docSnapshot of materialsSnapshot.docs) {
                    const data = docSnapshot.data();

                    const subjectData = subjectsMap[data.maMH] || {};
                    if (!subjectsMap[data.maMH]) {
                        if (ENABLE_LOGS) {
                            console.warn(`Không tìm thấy môn học với MaMH: ${data.maMH}`);
                        }
                    }
                    const subjectName = subjectData.TenMH || 'Môn học không xác định';
                    const facultyId = subjectData.MaKhoa || 'unknown';

                    const facultyData = facultiesMap[facultyId] || {};
                    if (!facultiesMap[facultyId]) {
                        if (ENABLE_LOGS) {
                            console.warn(`Không tìm thấy khoa với MaKhoa: ${facultyId}`);
                        }
                    }
                    const facultyName = facultyData.TenKhoa || 'Khoa không xác định';

                    const imageUrl = data.previewImages || '/images/no-image.jpg';
                    const cachedImage = await cacheImage(imageUrl, docSnapshot.id);

                    materialsList.push({
                        id: docSnapshot.id,
                        title: data.tenTaiLieu || 'Không có tiêu đề',
                        department: facultyName,
                        subject: subjectName,
                        imageUrl: cachedImage,
                        type: data.loai || 'PDF',
                        postTime: data.ngayDang
                            ? new Date(data.ngayDang.seconds * 1000).toLocaleDateString('vi-VN')
                            : 'Không xác định',
                        downloads: data.luotTaiVe || 0,
                    });
                }

                setCachedData(materialsList);
                setSearchResults(materialsList);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
                setLoading(false);
                if (ENABLE_LOGS) {
                    console.error('Lỗi khi lấy dữ liệu:', err);
                }
            }
        };

        const cachedData = getCachedData();
        if (cachedData) {
            setSearchResults(cachedData);
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    // Hàm hiển thị thông báo
    const showNotification = (message, type = 'info') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    // Hàm xử lý thay đổi sắp xếp
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // Hàm xử lý chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClickHeart = (id) => {
        const isLiked = clickedItems.has(id);

        setClickedItems((prevClickedItems) => {
            const newClickedItems = new Set(prevClickedItems);
            if (isLiked) {
                newClickedItems.delete(id);
            } else {
                newClickedItems.add(id);
            }
            return newClickedItems;
        });

        if (isLiked) {
            showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
        } else {
            showNotification('Đã thêm vào danh sách yêu thích', 'success');
        }
    };

    // Hàm xử lý khi nhấn vào nút dots
    const handleDotsClick = (id, e) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Hàm xử lý các hành động từ dropdown
    const handleAction = (action, itemId, e) => {
        if (e) {
            e.stopPropagation();
        }

        let message = '';
        let type = 'success';

        switch (action) {
            case 'download':
                message = 'Tính năng tải xuống đang được phát triển';
                type = 'info';
                break;
            case 'share':
                message = 'Tính năng chia sẻ đang được phát triển';
                type = 'info';
                break;
            case 'report':
                setReportItemId(itemId);
                setShowReportForm(true);
                break;
            default:
                break;
        }

        if (action !== 'report') {
            showNotification(message, type);
            setTimeout(() => {
                setOpenDropdownId(null);
            }, 100);
        } else {
            setOpenDropdownId(null);
        }
    };

    // Hàm xử lý khi gửi báo cáo
    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (!reportReason) {
            showNotification('Vui lòng chọn lý do báo cáo', 'error');
            return;
        }

        if (ENABLE_LOGS) {
            console.log('Báo cáo:', { itemId: reportItemId, reason: reportReason, description: reportDescription });
        }

        showNotification('Báo cáo của bạn đã được gửi', 'success');

        setShowReportForm(false);
        setReportReason('');
        setReportDescription('');
        setReportItemId(null);
    };

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            let shouldCloseDropdown = true;

            Object.keys(dropdownRefs.current).forEach((id) => {
                if (dropdownRefs.current[id] && dropdownRefs.current[id].contains(event.target)) {
                    shouldCloseDropdown = false;
                }
            });

            if (shouldCloseDropdown) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lọc dữ liệu dựa trên query params và selectedItems
    const filteredResults = searchResults.filter((item) => {
        const keywordMatch = keyword ? item.title.toLowerCase().includes(keyword.toLowerCase()) : true;
        const courseMatch = course ? item.department.toLowerCase().includes(course.toLowerCase()) : true;
        const subjectMatch = subject ? item.subject.toLowerCase().includes(subject.toLowerCase()) : true;
        const typeMatch =
            selectedItems.length === 0 || selectedItems.includes('option1')
                ? true
                : options.some(
                      (opt) => opt.label.toLowerCase() === item.type.toLowerCase() && selectedItems.includes(opt.value),
                  );

        return keywordMatch && courseMatch && subjectMatch && typeMatch;
    });

    // Sắp xếp dữ liệu (dựa trên sortOrder)
    const sortedResults = [...filteredResults].sort((a, b) => {
        if (sortOrder === 'newest') {
            return b.id.localeCompare(a.id);
        }
        return a.id.localeCompare(b.id);
    });

    // Tính toán phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedResults.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className={cx('filter-book-container')}>
                <div className={cx('alert-container')}>
                    {showAlert && (
                        <Alert
                            message={alertMessage}
                            type={alertType}
                            showIcon
                            closable
                            onClose={() => setShowAlert(false)}
                        />
                    )}
                </div>

                <div className={cx('search-bar')}>
                    <SearchBar />
                </div>

                <div className={cx('results-link')}>
                    <Link to="/">Trang chủ</Link> / <Link>{course || 'Công nghệ thông tin'}</Link> /{' '}
                    <Link>Sắp xếp theo ngày gần nhất</Link>
                </div>

                <div className={cx('results-content')}>
                    <div className={cx('results-body')}>
                        <div className={cx('results-list')}>
                            <div className={cx('results-header')}>
                                <p className={cx('results-title')}>
                                    Có <span>{filteredResults.length}</span> kết quả phù hợp
                                </p>
                                <div className={cx('results-dropdow')}>
                                    <span>Sắp xếp theo</span>
                                    <Dropdown
                                        options={['Ngày đăng gần nhất', 'Filter 2', 'Filter 3']}
                                        onChange={handleSortChange}
                                    />
                                </div>
                            </div>

                            {currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <div key={item.id} className={cx('book-item')}>
                                        <div className={cx('book-img')}>
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className={cx('book-thumbnail')}
                                                onError={(e) => {
                                                    e.target.src = '/images/no-image.jpg';
                                                }}
                                            />
                                            <button
                                                className={cx('btn-heart')}
                                                onClick={() => handleClickHeart(item.id)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{
                                                        color: clickedItems.has(item.id) ? 'red' : '#B3B3B3',
                                                    }}
                                                />
                                            </button>
                                        </div>
                                        <div className={cx('book-info')}>
                                            <p className={cx('book-department')}>{item.department}</p>
                                            <h3 className={cx('book-title')}>{item.title}</h3>
                                            <div className={cx('book-subject')}>
                                                <span>Môn</span>
                                                <p>{item.subject}</p>
                                            </div>
                                            <div className={cx('book-type')}>{item.type}</div>
                                            <div className={cx('book-time')}>
                                                <img src="/images/clock-icon.svg" alt="Clock Icon" />
                                                <span>{item.postTime}</span>
                                            </div>
                                            <div className={cx('book-dowload')}>
                                                <img src="/images/arrow-down-circle.svg" alt="Download Icon" />
                                                <span>{item.downloads}</span>
                                            </div>

                                            <div
                                                className={cx('action-dropdown')}
                                                ref={(el) => (dropdownRefs.current[item.id] = el)}
                                            >
                                                <button
                                                    className={cx('btn-dot')}
                                                    onClick={(e) => handleDotsClick(item.id, e)}
                                                >
                                                    <img src="/images/dots-icon.svg" alt="Dots Icon" />
                                                </button>

                                                {openDropdownId === item.id && (
                                                    <div className={cx('dropdown-menu')}>
                                                        <button
                                                            className={cx('dropdown-item')}
                                                            onClick={(e) => handleAction('download', item.id, e)}
                                                        >
                                                            Tải xuống
                                                        </button>
                                                        <button
                                                            className={cx('dropdown-item')}
                                                            onClick={(e) => handleAction('report', item.id, e)}
                                                        >
                                                            Báo cáo
                                                        </button>
                                                        <button
                                                            className={cx('dropdown-item')}
                                                            onClick={(e) => handleAction('share', item.id, e)}
                                                        >
                                                            Chia sẻ
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Không có kết quả phù hợp.</p>
                            )}
                        </div>

                        <div className={cx('pagination')}>
                            {Array.from(
                                { length: Math.ceil(filteredResults.length / itemsPerPage) },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    className={cx('page-button', { active: currentPage === page })}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={cx('filter-section')}>
                        <p>
                            <img src="/images/Filter.svg" alt="Filter Icon" />
                            <span>Lọc kết quả nhanh</span>
                        </p>
                        <div
                            style={{
                                marginTop: '20px',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>Loại</span>
                            <img src="/images/Down_fill.svg" alt="Dropdown Icon" />
                        </div>
                        <div className={cx('filter-checkbox')}>
                            <CheckboxGroup
                                options={options}
                                selectedValues={selectedItems}
                                onChange={setSelectedItems}
                            />
                        </div>
                    </div>
                </div>

                {showReportForm && (
                    <ReportFormModal
                        showReportForm={showReportForm}
                        setShowReportForm={setShowReportForm}
                        reportReason={reportReason}
                        setReportReason={setReportReason}
                        reportDescription={reportDescription}
                        setReportDescription={setReportDescription}
                        reportItemId={reportItemId}
                        setReportItemId={setReportItemId}
                        handleReportSubmit={handleReportSubmit}
                        cx={cx}
                    />
                )}
            </div>
        </>
    );
};

export default FilterDepartment;
