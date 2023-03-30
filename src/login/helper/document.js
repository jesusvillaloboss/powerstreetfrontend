export const buildDocument = (info) => {
  const data = {
    title: info.title,
    document: info.document,
    author: {
      user: info.user,
      name: info.name,
    },
    modified_by: {
      user: info.user,
      name: info.name,
    },
    created_at: Date.now(),
    updated_at: Date.now(),

    history_change: {
      document: 'null',
      date: 'null',
      server_date: '2023-01-16T22:26:28.158+0000',
      author_change: {
        user: 'null',
        name: 'null',
      },
    },
  };

  return data;
};
