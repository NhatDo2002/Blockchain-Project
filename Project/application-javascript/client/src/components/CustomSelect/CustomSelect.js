import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind"
import styles from './CustomSelect.module.scss'

const cx = classNames.bind(styles)


const Icon = ({ isOpen }) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

const CloseIcon = () => {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};

function CustomSelect({ placeHolder, options, isSearchable, onChange, isMulti, align}){
    

    const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null); // Stores the selected value(s)
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef(); // Reference to the search input element
    const inputRef = useRef(); 

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        if (isMulti) {
            return (
                <div className={cx("dropdown-tags")}>
                    {
                        selectedValue.map((option, index) => (
                            <div key={`${option.value}-${index}`} className={cx("dropdown-tag-item")}>
                                {option.label}
                                <span onClick={(e) => onTagRemove(e, option)} className={cx("dropdown-tag-item")} >
                                    <CloseIcon />
                                </span>
                            </div>
                        ))
                    }
                </div>
            );
        }
        return selectedValue.label;
    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option) => {
        if (isMulti) {
            return selectedValue.filter((o) => o.value === option.value).length > 0;
        }

        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };


    return (
        <div className={cx("custom--dropdown-container")}>

            <div ref={inputRef} onClick={handleInputClick} className={cx("dropdown-input")}>
                <div className={cx(`dropdown-selected-value`,`${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`)}>{getDisplay()}</div>
                <div className={cx("dropdown-tools")}>
                    <div className={cx("dropdown-tools")}>
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {
                showMenu && (
                    <div className={cx(`dropdown-menu alignment--${align || 'auto'}`)}>
                        {
                            isSearchable && (
                                <div className={cx("search-box")}>
                                    <input className={cx("form-control")} onChange={onSearch} value={searchValue} ref={searchRef} />
                                </div>
                            )
                        }
                        {
                            getOptions().map((option) => (
                                <div onClick={() => onItemClick(option)} key={option.value} className={cx(`dropdown-item`, `${isSelected(option) && "selected"}`)} >
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )  
}

export default CustomSelect