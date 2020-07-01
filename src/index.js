import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

let UserInfoContext = React.createContext(undefined);

function Header() {
    return (
        <header>
            <UserInfo/>
            <br/>
            <center>
                <ChangeAge/>
                <br/>
                <br/>
                <ChangeScore/>
            </center>
        </header>
    );
}
function UserInfo() {
    let {user_data} = React.useContext(UserInfoContext)
    let [isInputActive, setInputActive] = React.useState(false);

    return (
        <>
            <p>
                <table>
                    <tr>
                        <td>Name:&nbsp;</td>
                        <td>
                            <span style={{display: isInputActive?'none':'block'}} onClick={() => setInputActive(!isInputActive)} className={"user_name"}>{user_data.name}</span>
                            <input className={"name_input"} style={{display: isInputActive?'block':'none'}} onChange={(e) => user_data.setName(user_data.name = e.target.value)} value={user_data.name} type="text"/>
                        </td>
                        <td>
                            <span style={{display: isInputActive?'none':'block', fontSize: "11px", marginLeft:"10px", color:'red'}}> &lt;&lt; Click on the name to edit</span>
                            <span className={"user_input_toggle"} onClick={() => setInputActive(!isInputActive)} style={{display: isInputActive?'block':'none'}}>x</span>
                        </td>
                    </tr>
                </table>
            </p>
            <p>Age: {user_data.age}</p>
            <p>
                Grade:&nbsp;
                {(user_data.age >= 7) ? user_data.grade : (user_data.age >= 4?"Pre-School":'Not going to school yet')}
            </p>
            <UserNameWithStyle/>
        </>
    );
}
function UserNameWithStyle() {
    let {user_data} = React.useContext(UserInfoContext);
    return (
        <>
            <br/>
            <p>Stylish: {user_data.name} is {user_data.age} years old and he {(user_data.age >= 7) ? "studies in grade":(user_data.age >= 4 ? "studies in":"is")} {(user_data.age >= 7) ? user_data.grade : (user_data.age >= 4?"Pre-School":'not going to school yet')}</p>
            <UserScore/>
        </>
    );
}
function UserScore() {
    let {user_data} = React.useContext(UserInfoContext);
    return (
        <>
            <p style={{display: (user_data.grade >= 1) ? 'block':'none'}}>Exam Score: {user_data.score}%</p>
        </>
    );
}

function ChangeAge() {
    let {user_data} = React.useContext(UserInfoContext);
    function changeAgeHandle(x) {
        if (x === '-') {
            if (user_data.age > 1) {
                const decAge = () => {
                    user_data.setAge(--user_data.age);
                    return true;
                };
                if(decAge()) {
                    user_data.setGrade(--user_data.grade);
                }
            }
        }
        else if (x === '+') {
            if (user_data.age < 20) {
                const incAge = () => {
                    user_data.setAge(++user_data.age);
                    return true;
                }
                if (incAge()) {
                    user_data.setGrade(++user_data.grade);
                }
            }
        }
    }
    return (
        <>
            <button onClick={() => changeAgeHandle('-')}>-</button>
            &nbsp;<span>Age</span>&nbsp;&nbsp;
            <button onClick={() => changeAgeHandle('+')}>+</button>
        </>
    );
}
function ChangeScore() {
    let {user_data} = React.useContext(UserInfoContext);
    const changeScoreHandler = (x) => {
        if (x === '-') {
            if (user_data.score > 0) {
                user_data.setScore(--user_data.score)
            }
        } else if (x === '+') {
            if (user_data.score < 100) {
                user_data.setScore(++user_data.score)
            }
        }

    }
    return (
        <>
            <button onClick={() => changeScoreHandler('-')}>-</button>
            <span>Score</span>
            <button onClick={() => changeScoreHandler('+')}>+</button>
        </>
    );
}

function App() {
    let [name, setName] = React.useState('Johnny');
    let [age, setAge] = React.useState(17);

    let calcGrade = age - 6;

    let [grade, setGrade] = React.useState(calcGrade);
    let [score, setScore] = React.useState(98);


    let user_data = {
        name: name,
        age: age,
        grade: grade,
        score: score,
        setName: setName,
        setAge: setAge,
        setGrade: setGrade,
        setScore: setScore
    };
    return (
        <>
            <UserInfoContext.Provider value={{user_data}}>
                <Header/>
            </UserInfoContext.Provider>
        </>
    );
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App/>, rootElement);