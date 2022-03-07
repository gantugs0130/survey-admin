import React from "react";
import { Counter } from "./features/counter/Counter";
import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Switch>
                    <Route exact path="/">
                        <Counter />
                    </Route>
                </Switch>
            </header>
        </div>
    );
}

export default App;
