# GVAI Application Technical Architecture

## System Overview

GVAI is a comprehensive AI chat application with Retrieval Augmented Generation (RAG) capabilities. The application employs a modern client-server architecture consisting of a React TypeScript frontend and a Python Flask backend. The system integrates JWT-based authentication, WebSocket-based real-time communication, document management with vector storage, and AI model services.

## Core Architecture Components

### 1. Client-Server Architecture

```
┌───────────────────┐      ┌────────────────────┐
│   Frontend SPA    │◄────►│   Backend Server   │
│  (React/TypeScript)│      │  (Python/Flask)   │
└───────────────────┘      └────────────────────┘
        ▲                           ▲
        │                           │
        │                           ▼
        │                  ┌────────────────────┐
        └──────────────────┤   WebSocket API    │
                           └────────────────────┘
```

- **Communication Channels:**
  - RESTful HTTP APIs for CRUD operations
  - WebSocket connections for real-time streaming and events
  - JWT-based authentication across both channels

### 2. Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend (SPA)                        │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────────────────┐   │
│  │   Pages   │  │Components │  │      State/Stores     │   │
│  └───────────┘  └───────────┘  └───────────────────────┘   │
│                                                             │
│  ┌───────────────────────┐  ┌───────────────────────────┐  │
│  │     API Services      │  │    WebSocket Services     │  │
│  └───────────────────────┘  └───────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Frontend Components

1. **Application Core**
   - **App.tsx** - Main application component with routing and layout
   - **Pages** - Route-specific page components
     - `LoginPage.tsx` - Authentication entry point
     - `LoginCallbackPage.tsx` - OAuth callback handling
     - `HomePage.tsx` - Dashboard/landing page
     - `ChatPage.tsx` - Main conversation interface
     - `AllChatsPage.tsx` - Conversation history
     - `ManageRolesPage.tsx` - AI assistant role management

2. **UI Components**
   - **Chat Interface**
     - `Conversation.tsx` - Main conversation container
     - `MessageBubble.tsx` - Individual message display
     - `MessageInput.tsx` - User input interface
     - `NewChatInput.tsx` - Initial message input
   - **Navigation**
     - `Header.tsx` - Application header with status indicators
     - `Sidebar.tsx` - Navigation and conversation list
   - **RAG Components**
     - `DocumentSelector.tsx` - Interface for selecting documents
     - `RAGSettings.tsx` - Configuration interface for RAG parameters
     - `DocumentList.tsx` - Display uploaded documents
     - `DocumentUploader.tsx` - File upload interface with drag-and-drop
     - `DocumentsSidebar.tsx` - Document management sidebar
   - **Status Components**
     - `WebSocketStatusIndicator.tsx` - WebSocket connection status
     - `ModelStatusIndicator.tsx` - AI model availability status

3. **State Management**
   - **Stores**
     - `authStore.ts` - Authentication state and token management
     - `chatStore.ts` - Conversation and message state
   - **Hooks**
     - `useDocuments.ts` - Document management operations
     - Custom hooks for specific functionality

4. **Services**
   - **API Layer**
     - `apiService.ts` - Core REST API client
     - `queryService.ts` - React Query integration
   - **WebSocket Layer**
     - `websocketCore.ts` - Central WebSocket connection handler
     - `authHandler.ts` - Authentication WebSocket messages
     - `chatHandler.ts` - Chat message WebSocket handling
     - `documentHandler.ts` - Document operation messages
     - `modelHandler.ts` - Model status messages
     - `messageQueue.ts` - Message queuing during disconnections

### 3. Backend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Flask Application                     │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────────────────┐   │
│  │   API     │  │ WebSocket │  │     Configuration     │   │
│  │ Endpoints │  │ Endpoints │  │                       │   │
│  └───────────┘  └───────────┘  └───────────────────────┘   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │                Service Container                   │    │
│  │                                                    │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │    │
│  │  │    Base    │  │    Core    │  │ High-Level │   │    │
│  │  │  Services  │  │  Services  │  │  Services  │   │    │
│  │  └────────────┘  └────────────┘  └────────────┘   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Backend Components

1. **API Endpoints**
   - **REST API Routes** (`app/api/routes.py`)
     - Authentication endpoints
     - Document management endpoints
     - Conversation endpoints
     - AI configuration endpoints
   - **WebSocket Routes** (`app/api/websocket_routes.py`)
     - Chat WebSocket endpoint
     - Real-time status updates

2. **Service Layers**
   - **Base Services**
     - `AuthService` - Authentication and user management
     - `DBService` - Database operations and connection management
     - `AICoreService` - External AI service integration
     - `ServiceContainer` - Service initialization and dependency injection
   
   - **Core Services**
     - `ModelService` - AI model interface and management
     - `DocumentService` - Document processing and storage
     - `FileService` - File handling and processing
     - `RAGService` - Retrieval-augmented generation operations
     - `RoleService` - AI assistant role management
     - `MessageService` - Message processing and formatting
     - `StreamService` - Streaming response management

   - **High-Level Services**
     - `AIService` - Orchestrates AI operations
     - `ChainService` - Manages the sequence of operations for RAG and chat
     - `ConversationService` - Conversation data management
     - `WebSocketService` - Connection and message handling

3. **Database Model**
   - Users table
   - Conversations table
   - Messages table
   - Documents table
   - Document chunks table
   - Vector embeddings
   - AI assistant roles table

### 4. RAG System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       RAG System                            │
│                                                             │
│  ┌───────────────────────┐  ┌───────────────────────────┐  │
│  │  Document Processing  │  │    Query Processing       │  │
│  │       Pipeline        │  │                           │  │
│  └───────────────────────┘  └───────────────────────────┘  │
│                                                             │
│  ┌───────────────────────┐  ┌───────────────────────────┐  │
│  │   Vector Database     │  │  Context Construction     │  │
│  │                       │  │                           │  │
│  └───────────────────────┘  └───────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### RAG Components

1. **Document Processing Pipeline**
   - File upload handling
   - Text extraction (including OCR for images)
   - Chunking and metadata extraction
   - Vector embedding generation
   - Storage in vector database

2. **Retrieval System**
   - Query embedding generation
   - Semantic search in vector database
   - Document ranking by relevance
   - Context formation from retrieved chunks

3. **Integration with LLM**
   - Enhanced prompts with retrieved context
   - Source attribution in responses
   - Document-specific querying

### 5. WebSocket Communication System

```
┌──────────────────┐                  ┌──────────────────┐
│    Frontend      │                  │     Backend      │
│  WebSocketCore   │◄────────────────►│ WebSocketService │
└──────────────────┘                  └──────────────────┘
        │                                      │
┌──────────────────┐                  ┌──────────────────┐
│ Message Handlers │                  │ Message Handlers │
└──────────────────┘                  └──────────────────┘
        │                                      │
┌──────────────────┐                  ┌──────────────────┐
│  Message Queue   │                  │ Stream Responses │
└──────────────────┘                  └──────────────────┘
```

#### WebSocket Components

1. **Frontend WebSocket System**
   - Connection management with auto-reconnect
   - Message handlers for different message types
   - Message queuing during disconnections
   - State management for in-progress operations

2. **Backend WebSocket System**
   - Authentication and connection tracking
   - Message routing to appropriate services
   - Real-time event broadcasting
   - Streaming AI responses

### 6. AI Model Integration

```
┌──────────────────────────────────────────────────────────┐
│                      AI Service                          │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                 │
│  │  Model Service │  │  Chain Service │                 │
│  └────────────────┘  └────────────────┘                 │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                 │
│  │ Stream Service │  │   RAG Service  │                 │
│  └────────────────┘  └────────────────┘                 │
│                                                          │
└──────────────────────────────────────────────────────────┘
        │                         │
┌──────────────────┐    ┌─────────────────────┐
│   Model Adapters │    │ External AI Services│
└──────────────────┘    └─────────────────────┘
```

#### AI Integration Components

1. **Core AI Services**
   - Model management and caching
   - Response streaming
   - Context integration for RAG
   - Multi-model support

2. **Model Adapters**
   - Unified interface for different model providers
   - Model-specific parameter handling
   - Error handling and fallbacks

## Data Flows

### Authentication Flow

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│  User     │─────►│  Login    │─────►│  Auth     │─────►│  Backend  │
│  Browser  │      │  Page     │      │  Provider │      │  API      │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
                                                               │
                          ┌──────────────────────┐            │
                          │   JWT Token          │◄───────────┘
                          └──────────────────────┘
                                     │
┌───────────┐      ┌───────────┐     │
│  Protected│◄─────┤ Auth      │◄────┘
│  Routes   │      │ Store     │
└───────────┘      └───────────┘
```

### Chat Message Flow

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│  User     │─────►│ Message   │─────►│ WebSocket │─────►│ Backend   │
│  Input    │      │ Component │      │ Service   │      │ WebSocket │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
                                                               │
                                                               ▼
                                                        ┌───────────┐
                                                        │ AI Service │
                                                        └───────────┘
                                                               │
┌───────────┐      ┌───────────┐      ┌───────────┐           │
│ Message   │◄─────┤ Frontend  │◄─────┤ Stream    │◄──────────┘
│ Display   │      │ WebSocket │      │ Response  │
└───────────┘      └───────────┘      └───────────┘
```

### RAG Document Processing Flow

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│ Document  │─────►│ Upload    │─────►│ Backend   │─────►│ File      │
│ Upload    │      │ Component │      │ API       │      │ Service   │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
                                                               │
                                                               ▼
                                                        ┌───────────┐
                                                        │ Background │
                                                        │ Processing │
                                                        └───────────┘
                                                               │
                                                               ▼
                        ┌───────────┐              ┌────────────────────┐
                        │ Progress  │◄─────────────┤ Document Service   │
                        │ Updates   │              │ (Chunk & Embed)    │
                        └───────────┘              └────────────────────┘
                              │                              │
                              │                              ▼
                              │                     ┌────────────────────┐
                              │                     │ Vector Database    │
                              │                     └────────────────────┘
                              ▼                              │
                     ┌────────────────┐                      │
                     │ Frontend       │◄─────────────────────┘
                     │ Status Updates │
                     └────────────────┘
```

### RAG Query Flow

```
┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│ User      │─────►│ Chat      │─────►│ Backend   │─────►│ RAG       │
│ Query     │      │ Interface │      │ API       │      │ Service   │
└───────────┘      └───────────┘      └───────────┘      └───────────┘
                                                               │
                                                               ▼
                                                     ┌─────────────────┐
                                                     │ Vector Database │
                                                     └─────────────────┘
                                                               │
                                                               ▼
                                                     ┌─────────────────┐
                                                     │ Context         │
                                                     │ Construction    │
                                                     └─────────────────┘
                                                               │
                                                               ▼
                                                     ┌─────────────────┐
                                                     │ AI Model        │
                                                     │ with Context    │
                                                     └─────────────────┘
                                                               │
                             ┌───────────────┐                 │
                             │ Response with │◄────────────────┘
                             │ Source Info   │
                             └───────────────┘
```

## Database Schema

### Core Tables

1. **Users Table**
   - UUID (Primary Key)
   - Authentication information
   - User preferences

2. **Conversations Table**
   - Conversation ID (Primary Key)
   - User ID (Foreign Key)
   - Title
   - Created/Updated timestamps
   - Configuration (model, role, etc.)

3. **Messages Table**
   - Message ID (Primary Key)
   - Conversation ID (Foreign Key)
   - Role (user/assistant)
   - Content
   - Timestamp
   - Metadata (source documents, etc.)

4. **Documents Table**
   - Document ID (Primary Key)
   - User ID (Foreign Key)
   - Filename
   - Source path
   - Metadata (file type, size, etc.)
   - Processing status

5. **Document Chunks Table**
   - Chunk ID (Primary Key)
   - Document ID (Foreign Key)
   - Content
   - Metadata (page number, position, etc.)
   - Vector embedding

6. **Roles Table**
   - Role ID (Primary Key)
   - Name
   - System prompt
   - Configuration parameters

## Deployment Architecture

### Production Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                  Cloud Platform (e.g., SAP BTP)             │
│                                                             │
│  ┌────────────────┐   ┌────────────────┐                    │
│  │ Static Content │   │ Flask App      │                    │
│  │ (Frontend)     │   │ (Backend)      │                    │
│  └────────────────┘   └────────────────┘                    │
│          │                    │                             │
│          │                    │                             │
│          ▼                    ▼                             │
│  ┌────────────────┐   ┌────────────────┐                    │
│  │ Authentication │   │ WebSocket      │                    │
│  │ Service        │   │ Service        │                    │
│  └────────────────┘   └────────────────┘                    │
│                                                             │
│                 ┌────────────────────────┐                  │
│                 │ Vector Database        │                  │
│                 └────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  External AI Services                       │
└─────────────────────────────────────────────────────────────┘
```

### Development Environment

- Flask development server with hot reload
- Vite for frontend development
- Local database for development
- Environment variables for configuration

## Technical Specifications

### Backend Technologies

- **Python 3.x** - Core language
- **Flask** - Web framework
- **Flask-Sock** - WebSocket support
- **Flask-JWT-Extended** - Authentication
- **LangChain** - AI model orchestration
- **Vector Database** - Document indexing and search
- **Gunicorn** - WSGI HTTP Server

### Frontend Technologies

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **WebSocket API** - Real-time communication

### API Communication

- **REST API** - Standard HTTP methods
- **WebSocket** - Real-time bidirectional communication
- **JWT** - Authentication tokens

## Scaling Considerations

### Performance Optimizations

- **Model Caching** - Reduces initialization overhead
- **Connection Management** - WebSocket reconnection strategy
- **Message Queuing** - Handles temporary disconnections
- **Background Processing** - For document processing

### High Availability

- **WebSocket Connection Management** - Automatic reconnection
- **Status Monitoring** - Service health checks
- **Error Handling** - Comprehensive error management

## Security Architecture

### Authentication

- **JWT Authentication** - Signed tokens for identity verification
- **Token Management** - Expiration and refresh handling
- **Access Controls** - User-specific data isolation

### Data Protection

- **User Isolation** - Each user's data is segregated
- **Input Validation** - Request validation and sanitization
- **Error Handling** - Secure error responses

## Conclusion

The GVAI application demonstrates a sophisticated architecture integrating modern web technologies, AI services, and RAG capabilities. The layered service design, real-time communication, and document processing pipeline provide a robust foundation for AI-assisted conversations enhanced with document-based knowledge. 