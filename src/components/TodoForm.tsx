import React, { useState, useEffect, useRef } from 'react';

interface TodoFormProps {
  onSubmit: (todo: { id: number; text: string }) => void;
  edit?: { id: number; value: string };
}

function TodoForm({ onSubmit, edit }: TodoFormProps) {
  const [input, setInput] = useState<string>(edit ? edit.value : '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button className='todo-button edit'>Update</button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button className='todo-button'>Add todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
