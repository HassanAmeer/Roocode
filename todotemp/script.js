window.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    if (typeof particlesInit === 'function') {
        particlesInit();
    }

    // Original todo app code - moved inside DOMContentLoaded handler
    // Initialize elements once
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const statusMessage = document.getElementById('status-message');

    // Load tasks from localStorage
    loadTasks();

    // Add event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    // Declare variables on window to avoid redeclaration conflicts
    window.taskInput = document.getElementById('task-input') || {};
    window.addButton = document.getElementById('add-button') || {};
    window.taskList = document.getElementById('task-list') || {};
    window.statusMessage = document.getElementById('status-message') || {};

    // Create single reference points in script context
    taskInput = window.taskInput;
    addButton = window.addButton;
    taskList = window.taskList;
    statusMessage = window.statusMessage;

    // Load tasks from localStorage
    loadTasks();

    // Add task event
    addButton.addEventListener('click', function (e) {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Focus input on page load
    taskInput.focus();

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            // Announce empty input to screen readers
            updateStatusMessage('Please enter a task.');
            taskInput.focus();
            return;
        }

        // Create task element
        const taskItem = createTaskElement(taskText);

        // Add to list
        taskList.appendChild(taskItem);

        // Clear input and focus
        taskInput.value = '';
        taskInput.focus();

        // Save and announce
        saveTasks();
        updateStatusMessage(`Task added: ${taskText}`);
    }

    function createTaskElement(text, completed = false) {
        // Create task item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (completed) {
            taskItem.classList.add('completed');
        }
        taskItem.setAttribute('role', 'article');
        taskItem.setAttribute('aria-label', completed ? `Completed task: ${text}` : `Task: ${text}`);

        // Create task span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        taskSpan.setAttribute('tabindex', '0');
        taskSpan.setAttribute('role', 'button');
        taskSpan.setAttribute('aria-label', completed ? `Mark as incomplete: ${text}` : `Mark as complete: ${text}`);

        // Toggle completed status on click or keyboard
        taskSpan.addEventListener('click', function () {
            toggleTaskStatus(taskItem, taskSpan, text);
        });

        taskSpan.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTaskStatus(taskItem, taskSpan, text);
            }
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete task: ${text}`);

        deleteBtn.addEventListener('click', function () {
            const taskText = taskSpan.textContent;
            taskList.removeChild(taskItem);
            saveTasks();
            updateStatusMessage(`Task deleted: ${taskText}`);
        });

        deleteBtn.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const taskText = taskSpan.textContent;
                taskList.removeChild(taskItem);
                saveTasks();
                updateStatusMessage(`Task deleted: ${taskText}`);
            }
        });

        // Append elements
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);

        return taskItem;
    }

    function toggleTaskStatus(taskItem, taskSpan, text) {
        const isCompleted = taskItem.classList.toggle('completed');

        // Update aria-label for accessibility
        taskSpan.setAttribute('aria-label',
            isCompleted ? `Mark as incomplete: ${text}` : `Mark as complete: ${text}`
        );
        taskItem.setAttribute('aria-label',
            isCompleted ? `Completed task: ${text}` : `Task: ${text}`
        );

        saveTasks();
        updateStatusMessage(`Task marked ${isCompleted ? 'completed' : 'incomplete'}: ${text}`);
    }

    function saveTasks() {
        try {
            const tasks = [];
            document.querySelectorAll('.task-item').forEach(function (item) {
                const text = item.querySelector('span').textContent;
                const completed = item.classList.contains('completed');
                tasks.push({
                    text: text,
                    completed: completed
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.warn('Failed to save tasks:', e);
            // Could show a friendly error message to user
        }
    }

    function loadTasks() {
        try {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const tasks = JSON.parse(savedTasks);

                // Use DocumentFragment for better performance when adding multiple elements
                const fragment = document.createDocumentFragment();

                tasks.forEach(function (task) {
                    const taskItem = createTaskElement(task.text, task.completed);
                    fragment.appendChild(taskItem);
                });

                taskList.appendChild(fragment);
                updateStatusMessage(`Loaded ${tasks.length} tasks from storage.`);
            } else {
                updateStatusMessage('No saved tasks found.');
            }
        } catch (e) {
            console.warn('Failed to load tasks:', e);
            updateStatusMessage('Failed to load saved tasks.');
        }
    }

    function updateStatusMessage(message) {
        if (statusMessage) {
            statusMessage.textContent = message;
        }
        // For debugging
        console.log('Status:', message);
    }
});
