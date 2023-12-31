import { test, expect } from '@jupyterlab/galata';

test('should emit a message in a dialog when menu is triggered', async ({
  page
}) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  // Add listener to check alert message
  // > Alert are not capture by the recording
  page.once('dialog', async dialog => {
    expect(dialog.message()).toEqual(
      'jlab-examples:main-menu has been called from the menu.'
    );

    dialog.dismiss().catch(() => {});
  });

  // Click the menu entry
  await page.menu.clickMenuItem(
    'Main Menu Example>Execute jlab-examples:main-menu Command'
  );

  expect(
    logs.filter(
      s => s === 'jlab-examples:main-menu has been called from the menu.'
    )
  ).toHaveLength(1);
});
