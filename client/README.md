## Steps from scratch

### 1. Create react app with typescript

```
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
```

### 2. Add graphql npm packages

```
yarn add @apollo/react-hooks apollo-boost graphql
```

```
yarn add @types/graphql -D
```

### 3. Add `@graphql-codegen/cli`

```
yarn add -D @graphql-codegen/cli
```

- Select setting codegen configs
  This will add in the package.json:

* in script tag:

```
    "codegen(this is the name you create)": "graphql-codegen --config codegen.yml"
```

- in devDep:

```
    "@graphql-codegen/typescript": "1.17.6",
    "@graphql-codegen/typescript-operations": "1.17.6",
    "@graphql-codegen/typescript-react-apollo": "1.17.6",
```

- The `@graphql-codegen/cli` will create `codegen.yml` config file something like this:

```
overwrite: true
schema: "http://localhost:4000/graphql"
documents: "src/graphql/*.graphql"
generates:
  src/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```

After do again `yarn` to install added devDependencies by `@graphql-codegen/cli`

If you want only hooks then you can add to your codegen.yml config file:

`config: withHOC: false withComponent: false withHooks: true`

After `codegen.yml` should look like this:

```
overwrite: true
schema: "http://localhost:4000/graphql"
documents: "src/graphql/*.graphql"
generates:
  src/generated/graphql.tsx:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
    config:
      withHOC: false
      withComponent: false
      withHooks: true
 config:
      withHOC: false
      withComponent: false
      withHooks: true
```

### 4. Add routing

```
yarn add react-router-dom
```

types:

```
yarn add -D @types/react-router-dom
```
