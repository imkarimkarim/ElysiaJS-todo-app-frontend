'use client';

import { Button, Group, Space, useMantineColorScheme } from '@mantine/core';
import { FiMoon, FiSun, FiZap } from 'react-icons/fi';

export default function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  let nextColorScheme: any;
  let colorSchemeIcon: any;

  switch (colorScheme) {
    case 'light':
      nextColorScheme = 'dark';
      colorSchemeIcon = <FiSun />;
      break;

    case 'dark':
      nextColorScheme = 'auto';
      colorSchemeIcon = <FiMoon />;
      break;

    case 'auto':
      nextColorScheme = 'light';
      colorSchemeIcon = <FiZap />;

      break;

    default:
      nextColorScheme = 'auto';
      colorSchemeIcon = <FiZap />;
      break;
  }

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme(nextColorScheme)}>
        {colorSchemeIcon}
        <Space w={'xs'} />
        {colorScheme}
      </Button>
    </Group>
  );
}
