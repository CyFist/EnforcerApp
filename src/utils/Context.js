import * as React from 'react';
const Context = React.createContext();
const ContextProvider = ({ children }) => {
  //Overview
  const [userRecords, setUserRecords] = React.useState([]);
  const [selectedRec, setSelectedRec] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  //for usercard
  const ucRef = React.useRef([]);
  //for Modal
  const [openModal, setOpenModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  //Quiz
  const [Selected, setSelected] = React.useState([]);
  const [RemainingQns, setRemainingQns] = React.useState([]);
  const [QuizQns, setQuizQns] = React.useState([]);
  const [CurrQns, setCurrQns] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [ans, setAns] = React.useState([]);
  //BF
  const [bfsBank, setBFsBank] = React.useState({});
  const [bfs, setBFs] = React.useState({});
  const [currbf, setCurrbf] = React.useState({});

  return (
    <Context.Provider
      value={{
        query,
        setQuery,
        userRecords,
        setUserRecords,
        selectedRec,
        setSelectedRec,
        Selected,
        setSelected,
        QuizQns,
        setQuizQns,
        CurrQns,
        setCurrQns,
        options,
        setOptions,
        ans,
        setAns,
        RemainingQns,
        setRemainingQns,
        expanded,
        setExpanded,
        bfsBank,
        setBFsBank,
        bfs,
        setBFs,
        currbf,
        setCurrbf,
        ucRef,
        openModal,
        setOpenModal,
        modalTitle,
        setModalTitle
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
