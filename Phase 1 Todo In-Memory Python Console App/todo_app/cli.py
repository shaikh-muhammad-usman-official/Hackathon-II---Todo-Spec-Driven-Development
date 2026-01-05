"""
CLI interface using Rich for Todo application
"""
import sys
from typing import Optional
from rich.console import Console
from rich.table import Table
from rich import print
from .services import TodoService


class TodoCLI:
    """
    Rich-based CLI for Todo application
    """
    def __init__(self, todo_service: TodoService):
        self.service = todo_service
        self.console = Console()

    def add(self, title: str, description: str = "") -> int:
        """Add a new todo"""
        try:
            todo = self.service.add_todo(title, description)
            print(f"[green]✓ Added todo: {todo.title} (ID: {todo.id})[/green]")
            return 0
        except ValueError as e:
            print(f"[red]✗ Error: {e}[/red]", file=sys.stderr)
            return 1

    def list(self) -> int:
        """List all todos"""
        todos = self.service.list_todos()

        if not todos:
            print("[yellow]No todos found.[/yellow]")
            return 0

        table = Table(title="Todo List")
        table.add_column("ID", style="dim", width=8)
        table.add_column("Status", justify="center")
        table.add_column("Title", style="bold")
        table.add_column("Description", style="italic")
        table.add_column("Created", style="magenta")

        for todo in todos:
            status = "✓" if todo.completed else "○"
            status_color = "[green]" if todo.completed else "[red]"
            table.add_row(
                todo.id,  # Full integer ID
                f"{status_color}{status}[/]",
                todo.title,
                todo.description,
                todo.created_at.strftime("%Y-%m-%d %H:%M")
            )

        self.console.print(table)
        return 0

    def complete(self, todo_id: str) -> int:
        """Complete a todo by ID"""
        try:
            # Try to complete the todo
            todo = self.service.complete_todo(todo_id)
            if todo:
                print(f"[green]✓ Completed todo: {todo.title}[/green]")
                return 0
            else:
                # Todo not found
                print(f"[red]✗ Todo with ID {todo_id} not found[/red]", file=sys.stderr)
                return 1
        except Exception as e:
            print(f"[red]✗ Error completing todo: {e}[/red]", file=sys.stderr)
            return 1

    def delete(self, todo_id: str) -> int:
        """Delete a todo by ID"""
        try:
            # Try to delete the todo
            success = self.service.delete_todo(todo_id)
            if success:
                print(f"[green]✓ Deleted todo[/green]")
                return 0
            else:
                # Todo not found
                print(f"[red]✗ Todo with ID {todo_id} not found[/red]", file=sys.stderr)
                return 1
        except Exception as e:
            print(f"[red]✗ Error deleting todo: {e}[/red]", file=sys.stderr)
            return 1

    def update(self, todo_id: str, title: str = None, description: str = None) -> int:
        """Update a todo by ID"""
        try:
            # Try to update the todo
            todo = self.service.update_todo(todo_id, title=title, description=description)
            if todo:
                print(f"[green]✓ Updated todo: {todo.title}[/green]")
                return 0
            else:
                # Todo not found
                print(f"[red]✗ Todo with ID {todo_id} not found[/red]", file=sys.stderr)
                return 1
        except ValueError as e:
            print(f"[red]✗ Error: {e}[/red]", file=sys.stderr)
            return 1
        except Exception as e:
            print(f"[red]✗ Error updating todo: {e}[/red]", file=sys.stderr)
            return 1

    def interactive(self) -> int:
        """Run the interactive mode with enhanced Rich UI"""
        from rich.prompt import Prompt, Confirm
        from rich.panel import Panel
        from rich.box import ROUNDED
        from rich.console import Group
        import sys

        # Welcome message in a styled panel
        welcome_panel = Panel(
            "[bold blue]Welcome to Todo App Interactive Mode![/bold blue]\n\n"
            "[green]Manage your tasks efficiently with this interactive interface.[/green]",
            title="Todo App",
            border_style="bold blue",
            expand=False
        )
        self.console.print(welcome_panel)
        self.console.print()

        while True:
            try:
                # Create a menu panel with options
                menu_content = (
                    "[bold]1. 📝 Add[/bold]     - Add a new todo\n"
                    "[bold]2. 📋 List[/bold]     - List all todos\n"
                    "[bold]3. ✅ Complete[/bold]  - Mark a todo as completed\n"
                    "[bold]4. 🗑️ Delete[/bold]   - Remove a todo\n"
                    "[bold]5. ✏️ Update[/bold]   - Modify a todo\n"
                    "[bold]6. 🚪 Quit[/bold]     - Exit interactive mode"
                )

                menu_panel = Panel(
                    menu_content,
                    title="Available Commands",
                    border_style="cyan",
                    padding=(1, 2)
                )

                self.console.print(menu_panel)

                command_input = Prompt.ask(
                    "\n[bold magenta]Select an option",
                    default="help",
                    show_choices=False
                )

                # Map numeric input to command names
                command_map = {
                    "1": "add",
                    "2": "list",
                    "3": "complete",
                    "4": "delete",
                    "5": "update",
                    "6": "quit"
                }

                # Convert numeric input to command name if needed
                command = command_map.get(command_input.lower(), command_input.lower())

                # Validate command
                valid_commands = ["add", "list", "complete", "delete", "update", "quit", "help"]
                if command not in valid_commands:
                    error_panel = Panel(
                        f"[bold red]Invalid command: {command_input}. Please select a valid option.[/bold red]",
                        border_style="red",
                        expand=False
                    )
                    self.console.print(error_panel)
                    continue

                if command == "quit":
                    goodbye_panel = Panel(
                        "[bold green]👋 Goodbye! Thanks for using Todo App![/bold green]",
                        border_style="bold green",
                        expand=False
                    )
                    self.console.print(goodbye_panel)
                    break
                elif command == "help":
                    help_content = (
                        "[bold]Help & Instructions:[/bold]\n\n"
                        "[bold]📝 Add:[/bold] Create a new todo item\n"
                        "[bold]📋 List:[/bold] View all your todos in a formatted table\n"
                        "[bold]✅ Complete:[/bold] Mark a todo as completed\n"
                        "[bold]🗑️ Delete:[/bold] Remove a todo permanently\n"
                        "[bold]✏️ Update:[/bold] Modify title or description of a todo\n"
                        "[bold]🚪 Quit:[/bold] Exit the interactive mode\n\n"
                        "[italic]Enter the command number or name when prompted.[/italic]"
                    )
                    help_panel = Panel(
                        help_content,
                        title="Help & Instructions",
                        border_style="yellow",
                        padding=(1, 2)
                    )
                    self.console.print(help_panel)
                elif command == "add":
                    title = Prompt.ask("[bold cyan]Enter todo title")
                    description = Prompt.ask("[bold cyan]Enter description (optional)", default="")
                    self.add(title, description)
                elif command == "list":
                    self.list()
                elif command == "complete":
                    todo_id = Prompt.ask("[bold cyan]Enter todo ID to complete")
                    self.complete(todo_id)
                elif command == "delete":
                    todo_id = Prompt.ask("[bold cyan]Enter todo ID to delete")
                    self.delete(todo_id)
                elif command == "update":
                    todo_id = Prompt.ask("[bold cyan]Enter todo ID to update")
                    title = Prompt.ask("[bold cyan]Enter new title (or press Enter to skip)", default=None)
                    if title is not None and title.strip() == "":
                        title = None
                    description = Prompt.ask("[bold cyan]Enter new description (or press Enter to skip)", default=None)
                    if description is not None and description.strip() == "":
                        description = None
                    self.update(todo_id, title=title, description=description)

                # Add a small pause for better UX
                self.console.print()

            except KeyboardInterrupt:
                interrupted_panel = Panel(
                    "[bold red]Interrupted. Goodbye![/bold red]",
                    border_style="red",
                    expand=False
                )
                self.console.print("\n")
                self.console.print(interrupted_panel)
                break
            except Exception as e:
                error_panel = Panel(
                    f"[bold red]Error: {e}[/bold red]",
                    border_style="red",
                    expand=False
                )
                self.console.print(error_panel)

        return 0