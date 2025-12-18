- Install modules with `npm i`;
- Install postgres@16 in case you haven't;
- Enter `psql postgres` to enter psql shell, and use `CREATE DATABASE gator;`;
- Create a `.gatorconfig.json` at your home directory with the content:

```
{
  "db_url": "postgres://example",
}
```

- Replace `postgres://example` with a URL that matches home configuration using the following pattern: `protocol://username:password@host:port/database`
- The commands generate and migrate from package.json makes easier to interact with the db;
- Now it's possible to use `npm run start <command>`;
- You can check all the possible commands (like register, login, etc...) at `src/index.ts`
