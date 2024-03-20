function SelectedTableForm(props) {
    const {setSelectedRowList, totalHak} = props;
    const onClickClearButton = (event) => {
        setSelectedRowList([]);
    }
    return (
        <div>
            <button onClick={onClickClearButton}>비우기</button>
            &nbsp;학점 : {totalHak}
        </div>
    )
}

export default SelectedTableForm;
