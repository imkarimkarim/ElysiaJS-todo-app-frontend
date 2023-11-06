import { List } from '@mantine/core';
import React from 'react';
import Todo from './Todo';
import { TodoType } from '@/types/TodoType';

export default function TodoList({ todos }: { todos: TodoType[] }) {
  return (
    <List spacing="sm" size="sm" center>
      {todos.map((todo: TodoType) => (
        <Todo todo={todo} />
      ))}
    </List>
  );
}
