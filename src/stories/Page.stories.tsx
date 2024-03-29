import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Page from '../pages'

import * as HeaderStories from './Header.stories'

export default {
  title: 'Pages/Homepage',
  component: Page
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
  ...HeaderStories.LoggedIn.args
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args
}
