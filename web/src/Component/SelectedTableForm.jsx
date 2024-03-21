import {checkTimes, convertTimeToNumberArray} from "./TimeTable";

function SelectedTableForm(props) {
    const {selectedRow, setSelectedRow,
        selectedRowList, setSelectedRowList,
        totalHak, setTotalHak,
        setSelectedTimeList, selectedTimeList,
        selectedListSelectedRow, setSelectedListSelectedRow
    } = props;
    const onClickClearButton = (event) => {
        setSelectedTimeList([]);
        setSelectedListSelectedRow(undefined);
        setSelectedRowList([]);
        setSelectedRow(undefined);
        setTotalHak(0);
    }
    const onClickAddButton = (event) => {
        if (selectedRow === undefined) {
            alert("추가할 과목을 선택하세요!");
            return;
        }
        if (checkTimes(selectedTimeList, selectedRow.time)) {
            setSelectedRowList([...selectedRowList, selectedRow]);
            setTotalHak(totalHak + selectedRow.hak);
            setSelectedRow(undefined);
            const newSelectedTimeList = [...selectedTimeList];
            const curTimes = selectedRow.time;
            for (let i = 0; i < curTimes.length; i++) {
                const curTime = curTimes[i];
                const numberArray = convertTimeToNumberArray(curTime);
                for (let j = 0; j < numberArray.length; j++) {
                    newSelectedTimeList.push(numberArray[j]);
                }
            }
            setSelectedTimeList(newSelectedTimeList);
        } else {
            alert("중복되는 시간이 있습니다.");
        }
    }

    const onClickDeleteButton = (event) => {
        if (selectedListSelectedRow === undefined) {
            alert("삭제할 과목을 선택하세요!");
            return;
        }
        const newSelectedRowList = selectedRowList.filter((item) => (
            item.id !== selectedListSelectedRow.id
        ))
        setSelectedRowList(newSelectedRowList);
        setTotalHak(totalHak - selectedListSelectedRow.hak);
        let newSelectedTimeList = [...selectedTimeList];
        const curTimes = selectedListSelectedRow.time;
        for (let i = 0; i < curTimes.length; i++) {
            const curTime = curTimes[i];
            const numberArray = convertTimeToNumberArray(curTime);
            console.log(numberArray);
            newSelectedTimeList = newSelectedTimeList.filter((item) => (
                !numberArray.includes(item)
            ))
        }
        console.log(selectedTimeList, newSelectedTimeList);
        setSelectedListSelectedRow(undefined);
        setSelectedTimeList(newSelectedTimeList);
    }
    return (
        <div>
            &nbsp;담은 학점 : <span style={{fontWeight: "bold"}}>{totalHak}</span>&nbsp;
            &nbsp;<button onClick={onClickAddButton}>추가 ✅</button>
            &nbsp;<button onClick={onClickDeleteButton}>삭제 ❎</button>
            &nbsp;<button onClick={onClickClearButton}>비우기 🗑</button>
        </div>
    )
}

export default SelectedTableForm;
