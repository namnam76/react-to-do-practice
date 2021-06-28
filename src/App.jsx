import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    `早起きをする`,
    `週報を書く`
  ]);
  const [completeTodos, setCompleteTodos] = useState([`メールをチェックする`]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンを押したときの挙動定義
  const onClickAdd = () => {
    // 未入力の際に追加できないようにする
    if (todoText === "") return alert("文字を入力してください");
    // 未完了のToDo配列をコピーして作成、末尾に入力した値を追加
    const newTodos = [...incompleteTodos, todoText];
    // 未完了リストの更新
    setIncompleteTodos(newTodos);
    // 入力欄を初期化
    setTodoText("");
  };

  // 削除ボタンを押したときの挙動定義
  // 引数はリストの順番
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 一つ目の引数の要素から、二つ目の引数の要素分削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押したときの挙動定義
  const onClickComplete = (index) => {
    // 未完了リストから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // 完了リストに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // 更新
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタンを押したときの挙動定義
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: `red` }}>
          登録できるTODOは5個までだよ～。消化してね
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
