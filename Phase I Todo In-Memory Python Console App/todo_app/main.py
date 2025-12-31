"""
Main entry point for the Todo CLI application
"""
import argparse
import sys
from .repository import TodoRepository
from .services import TodoService
from .cli import TodoCLI


def create_app():
    """Create and configure the Todo application"""
    repository = TodoRepository()
    service = TodoService(repository)
    cli = TodoCLI(service)
    return cli


def main():
    """Main entry point with command line argument parsing"""
    parser = argparse.ArgumentParser(description="Todo CLI Application")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new todo")
    add_parser.add_argument("title", help="Title of the todo")
    add_parser.add_argument("--description", help="Description of the todo", default="")

    # List command
    list_parser = subparsers.add_parser("list", help="List all todos")

    # Complete command
    complete_parser = subparsers.add_parser("complete", help="Complete a todo")
    complete_parser.add_argument("id", help="ID of the todo to complete")

    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a todo")
    delete_parser.add_argument("id", help="ID of the todo to delete")

    # Update command
    update_parser = subparsers.add_parser("update", help="Update a todo")
    update_parser.add_argument("id", help="ID of the todo to update")
    update_parser.add_argument("--title", help="New title for the todo")
    update_parser.add_argument("--description", help="New description for the todo")

    # Interactive command
    interactive_parser = subparsers.add_parser("interactive", help="Run interactive mode")

    args = parser.parse_args()

    # Create the application
    app = create_app()

    # Execute based on command
    if args.command == "add":
        sys.exit(app.add(args.title, args.description))
    elif args.command == "list":
        sys.exit(app.list())
    elif args.command == "complete":
        sys.exit(app.complete(args.id))
    elif args.command == "delete":
        sys.exit(app.delete(args.id))
    elif args.command == "update":
        sys.exit(app.update(args.id, title=args.title, description=args.description))
    elif args.command == "interactive":
        sys.exit(app.interactive())
    elif not args.command:
        # Run interactive mode by default when no command is provided
        sys.exit(app.interactive())
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()