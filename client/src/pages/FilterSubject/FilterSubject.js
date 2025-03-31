import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames/bind';
import styles from './FilterSubject.module.scss';
import SearchBar from '../../layouts/components/SearchBar';
import CheckboxGroup from '../../components/CheckboxGroup/CheckboxGroup';
import Dropdown from '../../components/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const FilterSubject = () => {
    const location = useLocation();
    const { keyword, course, subject, type } = queryString.parse(location.search);
    const [clickedItems, setClickedItems] = useState(new Set());

    const [selectedItems, setSelectedItems] = useState([]);

    const options = [
        { value: 'option1', label: 'Tất cả' },
        { value: 'option2', label: 'PDF' },
        { value: 'option3', label: 'Word' },
        { value: 'option4', label: 'Excel' },
        { value: 'option5', label: 'PPT' },
    ];

    // Dummy data, thay thế bằng dữ liệu thật từ API
    const [searchResults, setSearchResults] = useState([
        {
            id: 1,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
        {
            id: 2,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
        {
            id: 3,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
        {
            id: 4,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
        {
            id: 5,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
        {
            id: 6,
            title: 'Giới thiệu lập trình di động',
            subject: 'Lập trình di động',
            department: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
            postTime: '30/09/2024',
            douwloads: 90,
            type: 'word',
        },
    ]);

    const [sortOrder, setSortOrder] = useState('newest');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Hàm xử lý thay đổi sắp xếp
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // Hàm xử lý lọc loại tài liệu
    const handleTypeChange = (type) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    };

    // Hàm xử lý chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClickHeart = (id) => {
        setClickedItems((prevClickedItems) => {
            const newClickedItems = new Set(prevClickedItems);
            if (newClickedItems.has(id)) {
                newClickedItems.delete(id); // Nếu đã nhấn thì bỏ chọn
            } else {
                newClickedItems.add(id); // Nếu chưa nhấn thì thêm vào
            }
            return newClickedItems;
        });
    };

    // Tính toán index của item đầu và cuối trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className={cx('filter-book-container')}>
                <div className={cx('search-bar')}>
                    <SearchBar />
                </div>

                <div className={cx('results-link')}>
                    <Link to="/">Trang chủ</Link> / <Link>Công nghệ thông tin</Link> / <Link>Lập trình di động</Link> /
                    <Link>Sắp xếp theo ngày gần nhất</Link>
                </div>

                <div className={cx('results-content')}>
                    <div className={cx('results-body')}>
                        <div className={cx('results-list')}>
                            <div className={cx('results-header')}>
                                <p className={cx('results-title')}>
                                    Có <span>128</span> kết quả phù hợp
                                </p>

                                <div className={cx('results-dropdow')}>
                                    <span>Sắp xếp theo</span>
                                    <Dropdown
                                        options={['Ngày đăng gần nhất', 'Filter 2', 'Filter 3']}
                                        label="Ngày đăng gần nhất"
                                    />
                                </div>
                            </div>

                            {currentItems.map((item) => (
                                <div key={item.id} className={cx('book-item')}>
                                    <div className={cx('book-img')}>
                                        <img src={item.imageUrl} alt={item.title} className={cx('book-thumbnail')} />
                                        <button className={cx('btn-heart')} onClick={() => handleClickHeart(item.id)}>
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                style={{ color: clickedItems.has(item.id) ? 'red' : '#B3B3B3' }}
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
                                            <img src="/images/clock-icon.svg" alt="" />
                                            <span>{item.postTime}</span>
                                        </div>
                                        <div className={cx('book-dowload')}>
                                            <img src="/images/arrow-down-circle.svg" alt="" />
                                            <span>{item.douwloads}</span>
                                        </div>

                                        <button className={cx('btn-dot')}>
                                            <img src="/images/dots-icon.svg" alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={cx('pagination')}>
                            {Array.from(
                                { length: Math.ceil(searchResults.length / itemsPerPage) },
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
                            <img src="/images/Filter.svg" alt="" />
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
                            <img src="/images/Down_fill.svg" alt="" />
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
            </div>
        </>
    );
};

export default FilterSubject;
