export const scrollToBottom = (scrollRef: React.RefObject<HTMLDivElement>) => {
if(scrollRef.current === null) {
  return 
}
const bottom = scrollRef.current.scrollHeight
return scrollRef.current.scrollTop = bottom
}