const mixins = {
  flexBox: (align = 'center', justify = 'center') => `
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
  `,
  boxShadow: () => `
    box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 4px;
  `,
  boxShadowClicked: () => `
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
    top:2px;
    position:relative;
  `,
  noScrollBar: () => `
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  `,
  scrollSnap: {
    parent: () => `
      overflow: auto;
      scroll-snap-type: y mandatory;
    `,
    child: () => `
      scroll-snap-align: start;
    `,
  },
};

export default mixins;
