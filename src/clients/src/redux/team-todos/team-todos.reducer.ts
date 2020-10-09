interface TodoAction {
  type: string;
  todos: object[];
  filter?: string;
  sort?: string;
  search?: string;
}

const DEFAULT_STATE = {
  todos: [],
  error: false,
  loading: false,
  filter: 'All',
  sort: 'oldest',
  search: '',
};

export default (state = DEFAULT_STATE, action: TodoAction) => {
  switch (action.type) {
    case 'TODOS_REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        todos: [...action.todos],
      };


    case 'TODOS_REQUEST_FAILED':
      return { ...state, error: true, loading: false };

    case 'TODOS_REQUEST_LOADING':
      return { ...state, error: false, loading: true };

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    case 'SET_SORT':
      return { ...state, sort: action.sort };

    case 'SET_SEARCH':
      
      return { ...state, search: action.search };

    case 'SEARCH_TODOS':
      return {
        ...state,
        loading: false,
        todos: action.todos.filter((todo: any) => {
          return Object.values(todo).indexOf(state.search) > -1;
        }),
      };

    case 'FILTER_TODOS':
      return {
        ...state,
        loading: false,
        error: false,
        todos: action.todos.filter((todo: any) => {
          // Checks if fitler value exist in todo
          return todo.category === state.filter;
        }),
      };
    case 'SORT_TODOS_ASC':
      return {
        ...state,
        todos: state.todos.slice().sort((a: any, b:any) => {
          return a[state.sort] - b[state.sort] 
        })
      };

      case 'SORT_TODOS_CREATED_AT_NEWEST':
        return {
          ...state,
          todos: [...state.todos].sort((a: any, b: any) => {
            return -new Date(a.createdAt) + -new Date(b.createdAt)
          })
        }

        case 'SORT_TODOS_CREATED_AT_OLDEST':

          return {
            ...state,
            todos: [...state.todos].sort((a: any, b: any) => {
              return +new Date(a.createdAt) - +new Date(b.createdAt)
            })
          }

        case 'SORT_TODOS_URGENCY_DSC': 
        
        return {
          ...state,
          todos: [...state.todos].sort((a: any, b: any) => {
            return a.urgency + b.urgency
          })
        }

        case 'SORT_TODOS_DIFFICULTY_DSC':  
        
        return {
          ...state,
          todos: [...state.todos].sort((a: any, b: any) => {
            return a.difficulty + b.difficulty
          })
        }

      case 'SORT_TODOS_DSC':
        return {
          ...state,
          todos: [...state.todos].sort((a: any, b:any) => {
            return a[state.sort] - b[state.sort] 
          })
        };


      case 'CLEAR_STATE': {
        return {...DEFAULT_STATE}
      }
        
    default:
      return state;
  }
};
