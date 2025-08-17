import { expect,test } from '@playwright/experimental-ct-react';
import { VoucherForm } from '../ui/VoucherForm';

// Fake UI_TEXT to match your test renders
const UI_TEXT = {
  VOUCHER_CODE: 'Enter your voucher code',
  WHERE_TO_FIND: 'Where do I find this?',
  ACTIVATE_PLAN: 'Activate Plan',
};

test.describe('VoucherForm component', () => {
  test('renders and submits voucher code', async ({ mount }) => {
    let lastVoucher = '';
    let submitCalled = false;
    let helpCalled = false;

    const component = await mount(
      <VoucherForm
        voucherCode=""
        onVoucherChange={v => { lastVoucher = v; }}
        onSubmit={() => { submitCalled = true; }}
        onHelpClick={() => { helpCalled = true; }}
        isLoading={false}
        errorMessage={undefined}
        // You can pass UI_TEXT as prop if VoucherForm accepts it or mock it at module level
      />
    );

    // Voucher label and help button appear
    await expect(component.getByText(UI_TEXT.VOUCHER_CODE)).toBeVisible();
    await expect(component.getByRole('button', { name: UI_TEXT.WHERE_TO_FIND })).toBeVisible();

    // Fill input (should uppercase)
    const input = component.locator('input');
    await input.fill('abc123');
    expect(lastVoucher).toBe('ABC123');

    // The activate button is enabled
    const activateButton = component.getByRole('button', { name: new RegExp(UI_TEXT.ACTIVATE_PLAN, 'i') });
    await expect(activateButton).toBeEnabled();

    // Clicking should set submitCalled
    await activateButton.click();
    expect(submitCalled).toBe(true);

    // Clicking Help button
    await component.getByRole('button', { name: UI_TEXT.WHERE_TO_FIND }).click();
    expect(helpCalled).toBe(true);
  });

  test('shows error message', async ({ mount }) => {
    const errorMsg = 'Voucher is invalid!';
    const component = await mount(
      <VoucherForm
        voucherCode=""
        onVoucherChange={() => {}}
        onSubmit={() => {}}
        onHelpClick={() => {}}
        isLoading={false}
        errorMessage={errorMsg}
      />
    );

    await expect(component.getByText(errorMsg)).toBeVisible();
  });

  test('shows loading and disables activate', async ({ mount }) => {
    const component = await mount(
      <VoucherForm
        voucherCode="XYZ"
        onVoucherChange={() => {}}
        onSubmit={() => {}}
        onHelpClick={() => {}}
        isLoading={true}
        errorMessage={undefined}
      />
    );
    const activateButton = component.getByRole('button', { name: /Processing/ });
    await expect(activateButton).toBeDisabled();
    await expect(activateButton).toHaveText(/Processing/);
  });
});
