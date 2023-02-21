const rootEl = document.getElementById('root');

const root = ReactDOM.createRoot(rootEl);

// const element = React.createElement('h1',  {className: "main"}, 'Hello World');

const element = (
    <header>
        <h1>Hello World</h1>
        <h2>Sub title</h2>
    </header>
);

root.render(element)