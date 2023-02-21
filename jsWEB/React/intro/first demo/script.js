var rootEl = document.getElementById('root');

var root = ReactDOM.createRoot(rootEl);

// const element = React.createElement('h1',  {className: "main"}, 'Hello World');

var element = React.createElement(
    'header',
    null,
    React.createElement(
        'h1',
        null,
        'Hello World'
    ),
    React.createElement(
        'h2',
        null,
        'Sub title'
    )
);

root.render(element);