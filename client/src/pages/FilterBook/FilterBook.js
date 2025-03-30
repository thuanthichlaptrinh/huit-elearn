import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames/bind';
import styles from './FilterBook.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import CheckboxGroup from '../../components/CheckboxGroup/CheckboxGroup';
import Dropdown from '../../components/Dropdown';

const cx = classNames.bind(styles);

const FilterBook = () => {
    const location = useLocation();
    const { keyword, course, subject, type } = queryString.parse(location.search);

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
            title: 'Lập trình di động',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
        },
        {
            id: 2,
            title: 'Công nghệ phần mềm',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
        },
        {
            id: 3,
            title: 'Nguyên lý ngôn ngữ lập trình',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
        },
        {
            id: 4,
            title: 'Nguyên lý ngôn ngữ lập trình',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
        },
        {
            id: 5,
            title: 'Nguyên lý ngôn ngữ lập trình',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
        },
        {
            id: 6,
            title: 'Nguyên lý ngôn ngữ lập trình',
            course: 'Khoa Công nghệ Thông tin',
            imageUrl: '/images/sack-laptrinhdidong.png',
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
                    <Link to="/">Trang chủ</Link>/<Link>Công nghệ thông tin</Link>/
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
                                    <img src={item.imageUrl} alt={item.title} className={cx('book-thumbnail')} />
                                    <div className={cx('book-info')}>
                                        <p className={cx('book-category')}>{item.course}</p>
                                        <h3 className={cx('book-title')}>{item.title}</h3>
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

export default FilterBook;
