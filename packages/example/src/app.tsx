import { BaseStore } from '@yimoko/store';
import { useState } from 'react';

console.log(BaseStore);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <button type="button" onClick={() => setCount(count => count + 1)}>
        count is: {count}
      </button>
    </div>
  );
}

export default App;
