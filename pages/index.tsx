import { theAxios } from '@/api/axios';
import { fetcher } from '@/api/fetcher';
import TodoList from '@/components/TodoList';
import { dismissLoadingToast, showLoadingToast } from '@/helpers/utils';
import useTodos from '@/hooks/swr/useTodos';
import { Button, Flex, List, Loader, Space, TextInput, ThemeIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { FiEdit2, FiPlusSquare } from 'react-icons/fi';

const ColorSchemeToggle = dynamic(() => import('@/components/ColorSchemeToggle'), {
  ssr: false,
});

export default function index() {
  const { todos, mutateTodos } = useTodos();

  const form = useForm({
    initialValues: {
      todo: '',
    },

    validate: {
      todo: (todo: string) => (todo.length > 0 ? null : "Todo Can't be empty"),
    },
  });

  const todoInputRef = useRef<any>();

  useEffect(() => {
    todoInputRef.current.focus();
  }, []);

  return (
    <>
      <ColorSchemeToggle />
      <br />
      <form
        onSubmit={form.onSubmit((values) => {
          // TODO refactor api calls
          showLoadingToast();
          theAxios
            .post('/todos/', {
              title: values.todo,
              description: '',
              isDone: false,
              nice: 0,
            })
            .then(() => {
              mutateTodos();
              form.reset();
              todoInputRef.current.focus();
            })
            .catch((err) => {
              console.log(err);
              // TODO style toast
              toast('There is a problem');
            })
            .finally(() => {
              dismissLoadingToast();
            });
        })}
      >
        <Flex justify="center">
          <TextInput
            ref={todoInputRef}
            {...form.getInputProps('todo')}
            autoFocus
            placeholder="Outdoor Adventure..."
            leftSection={<FiEdit2 />}
          />
          <Button type="submit">
            <FiPlusSquare aria-label="Add Todo" />
          </Button>
        </Flex>
      </form>
      <Space h={'sm'} />
      {!todos ? <Loader color="blue" /> : <TodoList todos={todos} />}
    </>
  );
}
