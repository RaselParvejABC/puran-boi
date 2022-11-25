import React from 'react';
import { Card } from 'react-daisyui';

const Blog = () => {
  return (
    <>
      <Card className="border-2 border-sky-600 mx-3 my-3">
        <Card.Body>
          <Card.Title tag="h2">
            What are the different ways to manage a state in a React
            application?
          </Card.Title>
          <p>
            Below options are available as State Management Solutions/Helpers in
            React. (Not a comprehensive list)
          </p>
          <ul className="list-disc list-inside">
            <li>useState()</li>
            <li>useReducer()</li>
            <li>
              React Context API (to share state with descendant components
              without Prop Drilling)
            </li>
            <li>useMemo() and useCallback()</li>
            <li>useEffect</li>
            <li>useRef</li>
            <li>Context with Custom Hooks</li>
            <li>React Query & React Location</li>
            <li>Zustand</li>
            <li>Valtio</li>
            <li>Jotai</li>
            <li>Redux</li>
          </ul>
        </Card.Body>
      </Card>
      <Card className="border-2 border-sky-600 mx-3 my-3">
        <Card.Body>
          <Card.Title tag="h2">
            How does Prototypical Inheritance work?
          </Card.Title>
          <p>
            Prototypical Inheritance works at Object-level, in contrast to
            Class-based Inheritance, which works at Class-level.
          </p>
          <p>
            In Prototypical Inheritance, a object inherits attributes from
            another object, which can change in a program's runtime, as object
            is a runtime in-memory entity, whereas class is a compile-time
            entity.
          </p>
          <p>
            On the other hand, in Class-based Inheritance, it's not an object
            that inherits. It is the object's class that inherits from another
            class or classes (not another object or objects).
          </p>
        </Card.Body>
      </Card>
      <Card className="border-2 border-sky-600 mx-3 my-3">
        <Card.Body>
          <Card.Title tag="h2">
            What is a unit test? Why should we write unit tests?
          </Card.Title>
          <p>
            A unit might mean a function, a method, a procedure, a module, or an
            object— small pieces that make a big software.
          </p>
          <p>A Unit Test means testing such an elemental unit.</p>
          <p>
            Unit tests are followed by larger-scale tests. Unit tests narrow
            down the number of things we should test on on later larger-scale
            test, thus saving time and giving us a solid ground for those
            larger-scale tests.
          </p>
        </Card.Body>
      </Card>
      <Card className="border-2 border-sky-600 mx-3 my-3">
        <Card.Body>
          <Card.Title tag="h2">
            What are the differences among React, Angular and Vue?
          </Card.Title>
          <p>
            React is a library, not a complete framework. So you need
            third-party tools, libraries, module etc. On the other hand, Angular
            is a Full-fledged Framework, not just a library.
          </p>
          <p>
            Vue is easier to learn that React. But React is more suited to
            larger and more complex applications.
          </p>
          <p>
            Vue is the clear choice for less experienced developers, and Angular
            would be preferred for those working on larger apps.
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Blog;
