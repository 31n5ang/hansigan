import React from "react";

function SearchForm(props) {
    const {search, setSearch, searchDepartment, setSearchDepartment} = props;

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const onKeyPressEnter = (event) => {
        if (event.key === 'Enter') {
            setSearch("");
        }
    }

    const onChangeDepartment = (event) => {
        setSearchDepartment(event.target.value);
    }

    return (
        <div className="SearchForm">
            <input value={search} onChange={onChangeSearch} onKeyPress={onKeyPressEnter} placeholder="교과목명, 교수명 검색"/>
            <select onChange={onChangeDepartment}>
                <option value="">개설학부</option>
                <option value="컴퓨터공학부">컴퓨터공학부</option>
                <option value="고용서비스정책학과">고용서비스정책학과</option>
                <option value="기계공학부">기계공학부</option>
                <option value="디자인ㆍ건축공학부">디자인ㆍ건축공학부</option>
                <option value="메카트로닉스공학부">메카트로닉스공학부</option>
                <option value="산업경영학부">산업경영학부</option>
                <option value="전기ㆍ전자ㆍ통신공학부">전기ㆍ전자ㆍ통신공학부</option>
                <option value="에너지신소재화학공학부">에너지신소재화학공학부</option>
                <option value="안전공학과">안전공학과</option>
                <option value="교양학부">교양학부</option>
                <option value="융합학과">융합학과</option>
                <option value="HRD학과">HRD학과</option>
            </select>
        </div>
    )
}

export default SearchForm;
