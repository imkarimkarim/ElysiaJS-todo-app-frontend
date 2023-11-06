import { theAxios } from '@/api/axios';
import { dismissLoadingToast, showLoadingToast } from '@/helpers/utils';
import useTodos from '@/hooks/swr/useTodos';
import { TodoType } from '@/types/TodoType';
import { Button, Flex, Space, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiCheck, FiCheckCircle, FiTrash2 } from 'react-icons/fi';

export default function Todo({ todo }: { todo: TodoType }) {
  console.log('🚀 - todo', todo);
  const { mutateTodos } = useTodos();
  const [editMode, setEditMode] = useState(false);
  const todoInputRef = useRef<any>();

  const form = useForm({
    initialValues: {
      todo: todo.title,
    },

    validate: {
      todo: (todo: string) => (todo.length > 0 ? null : "Todo Can't be empty"),
    },
  });

  return (
    <Flex justify={'space-between'} align={'center'} p={'4px'}>
      <div>
        <Flex justify={'center'} align={'center'}>
          {todo.isDone ? (
            <Button
              size="sm"
              color="green"
              onClick={() => {
                showLoadingToast();
                theAxios
                  .patch('/todos/' + todo._id, {
                    title: todo.title,
                    description: todo.description,
                    isDone: false,
                    nice: todo.nice,
                  })
                  .then(() => mutateTodos())
                  .catch((err) => {
                    console.log(err);
                    // TODO style toast
                    toast('There is a problem');
                  })
                  .finally(() => {
                    dismissLoadingToast();
                  });
              }}
            >
              <FiCheckCircle />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                showLoadingToast();
                theAxios
                  .patch('/todos/' + todo._id, {
                    title: todo.title,
                    description: todo.description,
                    isDone: true,
                    nice: todo.nice,
                  })
                  .then(() => mutateTodos())
                  .catch((err) => {
                    console.log(err);
                    // TODO style toast
                    toast('There is a problem');
                  })
                  .finally(() => {
                    dismissLoadingToast();
                  });
              }}
            >
              <FiCheck />
            </Button>
          )}
          <Space w={'sm'} />
          {editMode ? (
            <form
              onSubmit={form.onSubmit((values) => {
                // TODO refactor api calls
                showLoadingToast();
                theAxios
                  .patch('/todos/' + todo._id, {
                    title: values.todo,
                    description: todo.description,
                    isDone: todo.isDone,
                    nice: todo.nice,
                  })
                  .then(() => {
                    form.reset();
                    form.setFieldValue('todo', values.todo);
                    mutateTodos();
                  })
                  .catch((err) => {
                    console.log(err);
                    toast('There is a problem');
                  })
                  .finally(() => {
                    dismissLoadingToast();
                    setEditMode(false);
                  });
              })}
            >
              <TextInput {...form.getInputProps('todo')} ref={todoInputRef}></TextInput>
            </form>
          ) : (
            <Text
              size="lg"
              style={{ textDecoration: todo.isDone ? 'line-through' : 'auto' }}
              onClick={() => {
                setEditMode(true);
                setTimeout(() => {
                  todoInputRef.current.focus();
                }, 30);
              }}
            >
              {todo.title}
            </Text>
          )}
        </Flex>
      </div>
      {/* TODO transparent red */}
      <Button
        size="sm"
        color="red"
        onClick={() => {
          showLoadingToast();
          theAxios
            .delete('/todos/' + todo._id)
            .then(() => mutateTodos())
            .catch((err) => {
              console.log(err);
              // TODO style toast
              toast('There is a problem');
            })
            .finally(() => {
              dismissLoadingToast();
            });
        }}
      >
        <FiTrash2 />
      </Button>
    </Flex>
  );
}
