/* eslint-disable @next/next/no-img-element */
import { motion, useInView } from 'framer-motion';
import React, { useCallback,useEffect,useRef,useState } from 'react';
import { components } from '@/types/strapi';

type Props = components['schemas']['ItemsAssistantComponent'];

const DEFAULT_USER =
  'My sugar reading was 165 mg/dL after lunch... is that okay?';
const DEFAULT_ASSISTANT =
  "It's slightly higher than ideal. Try a 15-minute walk now—it can help bring it down.";

const DiabetesAssistant: React.FC<Props> = React.memo(
  ({
    title,
    description,
    icon,
    userMessage: userText = DEFAULT_USER,
    assistantMessage: assistantText = DEFAULT_ASSISTANT,
  }) => {
    // Only track the displayed message.
    const [typedUser, setTypedUser] = useState('');
    const [typedAssistant, setTypedAssistant] = useState('');
    const [phase, setPhase] = useState<'idle' | 'user' | 'assistant'>('idle');

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    // Handle typing effect via self-repeating timeout (less risk than setInterval).
    const typeMessage = useCallback(
      (
        targetText: string,
        setter: React.Dispatch<React.SetStateAction<string>>,
        onDone: () => void
      ) => {
        let i = 0;
        function typeNext() {
          setter(targetText.slice(0, i + 1));
          i++;
          if (i < targetText.length) {
            setTimeout(typeNext, 30); // Faster for polish
          } else {
            onDone();
          }
        }
        typeNext();
      },
      []
    );

    // Start the sequence when in view
    useEffect(() => {
      if (isInView && phase === 'idle') setPhase('user');
    }, [isInView, phase]);

    // User message typing
    useEffect(() => {
      if (phase !== 'user') return;
      setTypedUser('');
      setTypedAssistant('');
      typeMessage(userText, setTypedUser, () => setPhase('assistant'));
    }, [phase, userText, typeMessage]); // typeMessage is memoized

    // Assistant message typing
    useEffect(() => {
      if (phase !== 'assistant') return;
      setTypedAssistant('');
      const timeout = setTimeout(() => {
        typeMessage(assistantText, setTypedAssistant, () => {});
      }, 300); // Short delay after user
      return () => clearTimeout(timeout);
    }, [phase, assistantText, typeMessage]);

    // Render
    return (
      <div
        ref={ref}
        className="mx-auto mb-6 w-full rounded-3xl border-2 border-gray-200 bg-[#F2F5F9] p-4 md:mb-8 md:p-6 lg:p-8"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          {icon && icon.url && (
            <div className="h-10 w-10 flex-shrink-0">
              <img
                src={icon.url}
                alt={icon.name || 'Icon'}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-800 md:text-xl">
              {title || 'Your 24/7 Diabetes Assistant'}
            </h1>
            <p className="text-xs font-semibold text-gray-600 md:text-sm">
              {description || 'Expert advice whenever you need it'}
            </p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col gap-4 pt-8">
          {/* User message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: typedUser ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-end gap-2"
          >
            <div className="max-w-[99%] rounded-2xl rounded-br-none bg-[#08B4BD33] px-3 py-2 md:px-4">
              {typedUser && (
                <p className="text-sm text-gray-800 md:text-base">{typedUser}</p>
              )}
            </div>
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src="/assets/man2.svg"
                alt="User avatar"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Assistant message */}
          {phase === 'assistant' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: typedAssistant ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-end gap-2"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2563EB]">
                <img
                  src="/assets/gif1.gif"
                  alt="Assistant avatar"
                  loading="lazy"
                />
              </div>
              <div className="max-w-[99%] rounded-2xl rounded-bl-none bg-blue-600 px-3 py-2 text-white md:px-4">
                {typedAssistant && (
                  <p className="text-sm md:text-base">{typedAssistant}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
);

DiabetesAssistant.displayName = 'DiabetesAssistant'; // For React.memo debug

export default DiabetesAssistant;
