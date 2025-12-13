"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Icon from "@/components/ui/icon"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

function useClickAway(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" && "border border-neutral-700 bg-transparent",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export interface FluidDropdownCategory {
  id: string | number
  label: string
  icon: string
  color: string
  parentId?: number | null
}

interface FluidDropdownProps {
  categories: FluidDropdownCategory[]
  selectedCategory: FluidDropdownCategory | null
  onSelectCategory: (category: FluidDropdownCategory) => void
  placeholder?: string
}

const IconWrapper = ({
  iconName,
  isHovered,
  color,
}: { iconName: string; isHovered: boolean; color: string }) => (
  <motion.div 
    className="w-4 h-4 mr-2 relative" 
    initial={false} 
    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
  >
    <Icon name={iconName as any} size={16} style={{ color }} />
  </motion.div>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function FluidDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
  placeholder = "Выберите категорию"
}: FluidDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hoveredCategory, setHoveredCategory] = React.useState<string | number | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const groupedCategories = React.useMemo(() => {
    const groups: { parent: FluidDropdownCategory | null; items: FluidDropdownCategory[] }[] = []
    
    const parentCategories = categories.filter(cat => !cat.parentId)
    
    parentCategories.forEach(parent => {
      const children = categories.filter(cat => cat.parentId === parent.id)
      if (children.length > 0) {
        groups.push({ parent, items: children })
      } else {
        groups.push({ parent: null, items: [parent] })
      }
    })
    
    return groups
  }, [categories])

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="w-full relative"
        ref={dropdownRef}
      >
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full justify-between bg-neutral-900 text-neutral-400",
              "hover:bg-neutral-800 hover:text-neutral-200",
              "focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black",
              "transition-all duration-200 ease-in-out",
              "border border-transparent focus:border-neutral-700",
              "h-10 px-4",
              isOpen && "bg-neutral-800 text-neutral-200",
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="flex items-center">
              {selectedCategory ? (
                <>
                  <IconWrapper 
                    iconName={selectedCategory.icon} 
                    isHovered={false} 
                    color={selectedCategory.color} 
                  />
                  {selectedCategory.label}
                </>
              ) : (
                placeholder
              )}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-5 h-5"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 1, y: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: "auto",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  height: 0,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  },
                }}
                className="absolute left-0 right-0 top-full mt-2 z-50"
                onKeyDown={handleKeyDown}
              >
                <motion.div
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-lg max-h-[400px] overflow-y-auto"
                  initial={{ borderRadius: 8 }}
                  animate={{
                    borderRadius: 12,
                    transition: { duration: 0.2 },
                  }}
                  style={{ transformOrigin: "top" }}
                >
                  <motion.div 
                    className="py-2 relative" 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                  >
                    {groupedCategories.map((group, groupIndex) => (
                      <React.Fragment key={groupIndex}>
                        {group.parent && (
                          <motion.div 
                            className="px-4 py-2 text-xs font-medium text-neutral-500 flex items-center gap-2"
                            variants={itemVariants}
                          >
                            <Icon name={group.parent.icon as any} size={14} style={{ color: group.parent.color }} />
                            {group.parent.label}
                          </motion.div>
                        )}
                        
                        {group.items.map((category) => {
                          const isHovered = hoveredCategory === category.id
                          const isSelected = selectedCategory?.id === category.id
                          
                          return (
                            <motion.button
                              key={category.id}
                              onClick={() => {
                                onSelectCategory(category)
                                setIsOpen(false)
                              }}
                              onHoverStart={() => setHoveredCategory(category.id)}
                              onHoverEnd={() => setHoveredCategory(null)}
                              className={cn(
                                "relative flex w-full items-center px-4 py-2.5 text-sm rounded-md",
                                "transition-all duration-150",
                                "focus:outline-none",
                                group.parent && "pl-8",
                                isSelected || isHovered
                                  ? "text-neutral-200 bg-neutral-800"
                                  : "text-neutral-400",
                              )}
                              whileTap={{ scale: 0.98 }}
                              variants={itemVariants}
                              style={{
                                backgroundColor: isSelected || isHovered ? `${category.color}15` : 'transparent'
                              }}
                            >
                              <IconWrapper
                                iconName={category.icon}
                                isHovered={isHovered}
                                color={category.color}
                              />
                              <span style={{ color: isSelected || isHovered ? category.color : undefined }}>
                                {category.label}
                              </span>
                            </motion.button>
                          )
                        })}
                        
                        {groupIndex < groupedCategories.length - 1 && (
                          <motion.div 
                            className="mx-4 my-2 border-t border-neutral-800" 
                            variants={itemVariants} 
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </MotionConfig>
  )
}
