import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

// Detailed thought data with full content
const thoughtsData = {
  '1': {
    title: 'Vibe Coding: Bridging Business Acumen and Technical Implementation',
    date: 'April 3, 2024',
    readTime: '8 min read',
    author: 'Lenna',
    tags: ['Programming', 'Career', 'Learning'],
    heroImage: 'vibe-coding',
    summary: 'My journey learning to code as a business major and how "vibe coding" has become my approach to problem-solving in the tech world.',
    content: [
      {
        type: 'paragraph',
        text: 'As a business major venturing into the world of programming, I\'ve often found myself at the intersection of business thinking and technical implementation. This unique vantage point has led me to develop what I playfully call "vibe coding" — an approach that prioritizes understanding the broader context and business value over perfect technical implementation.'
      },
      {
        type: 'paragraph',
        text: 'When I first started coding, I was intimidated by the seemingly infinite depth of technical knowledge required. How could I possibly compete with computer science graduates who had been coding since childhood? But what I soon realized is that my business background gave me a different superpower: the ability to quickly grasp the "why" behind technical requirements.'
      },
      {
        type: 'heading',
        text: 'What is Vibe Coding?'
      },
      {
        type: 'paragraph',
        text: 'Vibe coding isn\'t about writing sloppy code or taking shortcuts. Rather, it\'s about recognizing that code is a means to an end — a tool to solve business problems. It involves:',
      },
      {
        type: 'list',
        items: [
          'Understanding the business context before diving into code',
          'Focusing on the user experience and business outcomes',
          'Leveraging high-level abstractions when appropriate',
          'Being comfortable with "good enough" solutions that can evolve',
          'Communicating effectively across technical and non-technical teams'
        ]
      },
      {
        type: 'paragraph',
        text: 'In practice, this might mean using a well-established library instead of building something from scratch, or prioritizing a working prototype over a perfectly optimized solution. It\'s about making pragmatic trade-offs that align with business goals.'
      },
      {
        type: 'quote',
        text: 'Perfect is the enemy of good. In business, a working solution today is often more valuable than a perfect solution tomorrow.',
        author: 'Voltaire (adapted)'
      },
      {
        type: 'heading',
        text: 'The Power of Abstraction'
      },
      {
        type: 'paragraph',
        text: 'One of the key aspects of vibe coding is embracing abstraction. Modern programming has evolved to include incredibly powerful abstractions that allow developers to accomplish complex tasks with relatively simple code. Frameworks, libraries, APIs, and now AI coding assistants have dramatically lowered the barrier to entry.'
      },
      {
        type: 'paragraph',
        text: 'For example, when building a RAG application on SAP BTP, I didn\'t need to understand every intricacy of vector embeddings or token processing. Instead, I focused on understanding the key concepts, the architecture, and how to leverage the provided tools effectively. This allowed me to deliver a working solution that met business needs without getting lost in technical details that weren\'t immediately relevant.'
      },
      {
        type: 'heading',
        text: 'The Business Value Perspective'
      },
      {
        type: 'paragraph',
        text: 'Perhaps the most valuable aspect of coming from a business background is the constant focus on value creation. Every technical decision is viewed through the lens of: "How does this create value for users and the business?"'
      },
      {
        type: 'paragraph',
        text: 'This perspective helps prevent what I\'ve observed as a common pitfall in technical teams: optimization for optimization\'s sake. While technical excellence is important, it should always serve a business purpose. A slightly less efficient algorithm that ships on time and meets user needs is often better than a perfectly optimized solution that misses market timing.'
      },
      {
        type: 'heading',
        text: 'Learning to Embrace Uncertainty'
      },
      {
        type: 'paragraph',
        text: 'Perhaps the most challenging aspect of vibe coding is learning to be comfortable with uncertainty. As someone without a formal CS background, I\'ve had to accept that there will always be gaps in my knowledge. However, I\'ve learned that what matters most is not knowing everything, but knowing how to find answers and how to ask the right questions.'
      },
      {
        type: 'paragraph',
        text: 'This approach has served me well in projects where requirements are fluid and business needs evolve rapidly. Rather than getting stuck in analysis paralysis, I\'ve learned to iterate quickly, gather feedback, and refine solutions based on real-world usage.'
      },
      {
        type: 'heading',
        text: 'The Future of Coding for Business Professionals'
      },
      {
        type: 'paragraph',
        text: 'As AI tools continue to evolve, I believe the barrier between business thinking and technical implementation will continue to lower. We\'re entering an era where understanding the problem space and being able to clearly articulate requirements might be more valuable than memorizing syntax or algorithms.'
      },
      {
        type: 'paragraph',
        text: 'This doesn\'t diminish the value of deep technical expertise — if anything, it makes specialized knowledge even more valuable. But it does open the door for more business professionals to actively participate in building technical solutions rather than simply specifying requirements.'
      },
      {
        type: 'heading',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'Vibe coding isn\'t for everyone or every situation. Mission-critical systems with stringent performance or security requirements will always benefit from deep technical expertise and formal approaches. But for many business applications, particularly internal tools and MVPs, the pragmatic approach of vibe coding can deliver significant value.'
      },
      {
        type: 'paragraph',
        text: 'As I continue my journey at the intersection of business and technology, I\'m excited to see how these worlds continue to blend. The future belongs not just to those who can code perfectly, but to those who can bridge the gap between business needs and technical possibilities.'
      }
    ]
  },
  '2': {
    title: 'Memory Persistence in Large Language Models',
    date: 'March 18, 2024',
    readTime: '6 min read',
    author: 'Lenna',
    tags: ['AI', 'LLMs', 'Technical'],
    heroImage: 'llm-memory',
    summary: 'Exploring various approaches to implementing memory in LLM applications and the benefits of multi-tiered memory systems.',
    content: [
      {
        type: 'paragraph',
        text: 'Memory is a fundamental component of any intelligent system, and Large Language Models (LLMs) are no exception. Despite their impressive capabilities, LLMs are inherently stateless and face significant context window limitations. In this post, I\'ll explore the practical approaches I\'ve implemented to give LLMs a more persistent form of memory.'
      },
      {
        type: 'paragraph',
        text: 'Working on various AI projects, I\'ve come to appreciate that memory in LLMs isn\'t just a technical challenge—it\'s critical for creating truly useful applications that can maintain continuity in interactions and build on previous exchanges.'
      },
      {
        type: 'heading',
        text: 'The Memory Challenge'
      },
      {
        type: 'paragraph',
        text: 'Even with the expanded context windows of modern LLMs, there are several limitations we must address:'
      },
      {
        type: 'list',
        items: [
          'Context windows, while growing, are still finite (4k to 128k tokens)',
          'Each token in the context window has a cost, both in terms of computation and API charges',
          'Information in the context window is unstructured and not differentiated by importance',
          'No native persistent memory exists between separate interactions'
        ]
      },
      {
        type: 'heading',
        text: 'Implementing Multi-Tiered Memory'
      },
      {
        type: 'paragraph',
        text: 'In my projects, I\'ve found that a multi-tiered approach to memory works best. This mimics human memory systems with different types of storage optimized for different purposes:'
      },
      {
        type: 'heading',
        text: 'Short-Term Conversation Memory'
      },
      {
        type: 'paragraph',
        text: 'The most straightforward approach is simply maintaining the recent conversation history in the context window. This works well for continuous sessions but requires intelligent truncation strategies when conversations grow too long.'
      },
      {
        type: 'paragraph',
        text: 'When implementing this in a recent project, I used a sliding window approach that prioritized keeping the most recent exchanges while summarizing older parts of the conversation. This preserved continuity while managing token usage.'
      },
      {
        type: 'heading',
        text: 'Summarization Memory'
      },
      {
        type: 'paragraph',
        text: 'As conversations grow, having the LLM periodically generate summaries of the interaction so far has proven extremely effective. These summaries can replace the raw conversation history, dramatically reducing token usage while maintaining conversational context.'
      },
      {
        type: 'code',
        language: 'python',
        text: `def update_memory_with_summary(messages, threshold=3000):
    """Summarize conversation when it exceeds token threshold"""
    if count_tokens(messages) > threshold:
        summary_prompt = [
            {"role": "system", "content": "Summarize the conversation so far."},
            *messages
        ]
        summary = generate_summary(summary_prompt)
        # Replace old messages with summary
        return [
            {"role": "system", "content": f"Previous conversation summary: {summary}"},
            # Keep last few messages for continuity
            *messages[-3:]
        ]
    return messages`
      },
      {
        type: 'heading',
        text: 'Entity Memory'
      },
      {
        type: 'paragraph',
        text: 'For applications that need to track specific entities (users, products, projects), I\'ve implemented dedicated entity memory systems. These store structured information about each entity that can be selectively loaded into context when relevant.'
      },
      {
        type: 'paragraph',
        text: 'For instance, in a customer service bot, we maintain a structured record of each customer\'s preferences, past issues, and interaction style. When that customer returns, we load only the relevant information rather than their entire interaction history.'
      },
      {
        type: 'heading',
        text: 'Vector Database for Semantic Memory'
      },
      {
        type: 'paragraph',
        text: 'Perhaps the most powerful approach I\'ve implemented is using vector databases to store embeddings of previous interactions or knowledge. This allows for semantic retrieval of only the most relevant past information when needed.'
      },
      {
        type: 'paragraph',
        text: 'In practice, this means the LLM can "remember" information from hundreds of previous interactions without keeping all that information in context at once. We simply query the vector database with the current question to retrieve the most relevant prior knowledge.'
      },
      {
        type: 'heading',
        text: 'Practical Implementation Learnings'
      },
      {
        type: 'paragraph',
        text: 'While implementing these memory systems across various projects, I\'ve learned several practical lessons:'
      },
      {
        type: 'list',
        items: [
          'Hybrid approaches work best—combine multiple memory strategies rather than relying on just one',
          'Memory retrieval should be contextual—don\'t load everything, load what\'s relevant to the current exchange',
          'Use the LLM\'s own capabilities to manage memory by having it decide what information to store and retrieve',
          'Design memory schemas that separate factual information from subjective impressions or inferences',
          'Implement forgetting mechanisms—not all information needs to be remembered indefinitely'
        ]
      },
      {
        type: 'heading',
        text: 'The Future of LLM Memory'
      },
      {
        type: 'paragraph',
        text: 'As context windows continue to expand and models become more efficient, some of these techniques may become less critical. However, I believe structured, multi-tiered memory systems will remain important for complex applications.'
      },
      {
        type: 'paragraph',
        text: 'In particular, I\'m excited about the potential for LLMs to develop more human-like episodic memory, where they can recall not just facts but experiences and their emotional context. This will be critical for more natural and compelling AI interactions.'
      },
      {
        type: 'heading',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'Effective memory implementation is what transforms a powerful but stateless LLM into a genuinely useful assistant or agent. By thoughtfully designing memory systems that match our use cases, we can create AI experiences that feel continuous, personal, and truly intelligent.'
      },
      {
        type: 'paragraph',
        text: 'In my next post, I\'ll dive deeper into specific implementations of vector retrieval augmented generation (RAG) and how it can be combined with other memory strategies for optimal results.'
      }
    ]
  }
};

// Context type for type checking
interface ContextType {
  childVariants: any;
  HeadingStyles: {
    h1: string;
    h2: string;
    subtitle: string;
  };
  GradientStyles: {
    primary: string;
    secondary: string;
    intense: string;
    soft: string;
    card: string;
  };
}

const ThoughtDetail: React.FC = () => {
  const { thoughtId } = useParams<{ thoughtId: string }>();
  const navigate = useNavigate();
  const thought = thoughtId ? thoughtsData[thoughtId as keyof typeof thoughtsData] : null;
  const { GradientStyles } = useOutletContext<ContextType>();

  // Function to render different content types
  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph':
        return <p key={index} className="text-lg leading-relaxed mb-6">{item.text}</p>;
      case 'heading':
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4 mt-8 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {item.text}
          </h2>
        );
      case 'list':
        return (
          <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
            {item.items.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className="text-lg">{listItem}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-accent-primary pl-4 italic my-6 py-2 text-text-secondary">
            <p className="text-lg mb-2">{item.text}</p>
            {item.author && <p className="text-sm">— {item.author}</p>}
          </blockquote>
        );
      case 'code':
        return (
          <div key={index} className="bg-card rounded-lg p-4 my-6 overflow-x-auto">
            <pre className="text-sm">
              <code className="font-mono">{item.text}</code>
            </pre>
          </div>
        );
      default:
        return <p key={index} className="text-lg mb-4">{item.text}</p>;
    }
  };

  if (!thought) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Thought Not Found</h1>
        <p className="text-text-secondary mb-6">The article you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/thoughts')}
          className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary transition-colors"
        >
          Back to Thoughts
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent-primary/5 hover:scrollbar-thumb-accent-primary/10 scrollbar-track-transparent scrollbar-thumb-rounded-full"
    >
      {/* Subtle back button at the top */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => navigate('/thoughts')}
          className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back to Thoughts</span>
        </button>
      </div>

      {/* Header image with improved gradient overlay */}
      <div className={`w-full h-72 md:h-96 bg-gradient-to-r ${GradientStyles.intense} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background/5 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
        <div className="text-white/30 italic text-xl z-10">[ Header Image - {thought.heroImage} ]</div>
        
        {/* Title overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 max-w-5xl mx-auto">
            {thought.title}
          </h1>
        </div>
      </div>

      {/* Article metadata and content - wider layout */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Simplified metadata with tags next to date */}
        <div className="flex flex-wrap justify-between items-center text-text-secondary mb-8">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{thought.date}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {thought.tags.map(tag => (
              <span
                key={tag}
                className="text-sm bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article summary */}
        <div className="mb-12">
          <p className="text-xl font-medium italic text-text-secondary border-l-4 border-accent-primary pl-4 py-2">
            {thought.summary}
          </p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">
          {thought.content.map(renderContent)}
        </article>

        {/* Article footer - removed share buttons */}
        <div className="mt-16 pt-8 border-t border-border flex justify-end">
          <button 
            onClick={() => navigate('/thoughts')}
            className="px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-secondary transition-colors"
          >
            Back to Thoughts
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ThoughtDetail;
