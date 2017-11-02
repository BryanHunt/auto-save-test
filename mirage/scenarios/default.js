export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
  let task1 = server.create('task', {title: "Task 1"});
  task1.createComment({text: "Comment 1"});
  let task2 = server.create('task', {title: "Task 2"});
  task2.createComment({text: "Comment 2"});
}
