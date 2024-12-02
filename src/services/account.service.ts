interface Account {
  accountNumber: string;
  accountName: string;
  balance: number;
}

const accounts: Account[] = [
  { accountNumber: "1234567890", accountName: "John Doe", balance: 5000 },
  { accountNumber: "0987654321", accountName: "Jane Smith", balance: 7500 },
  { accountNumber: "1122334455", accountName: "Bob Johnson", balance: 3000 },
];

const validateAccount = async (
  accountNumber: string,
  accountName: string
): Promise<boolean> => {
  const account = accounts.find(
    (acc) =>
      acc.accountNumber === accountNumber && acc.accountName === accountName
  );
  return !!account;
};

const getBalance = async (accountNumber: string): Promise<number | null> => {
  const account = accounts.find((acc) => acc.accountNumber === accountNumber);
  return account ? account.balance : null;
};

export { validateAccount, getBalance };
