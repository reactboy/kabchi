import { NextPage } from 'next'
import { Stack, Text } from '@chakra-ui/react'

import { Heading } from 'components/common'
import { AppLayout } from 'components/layout'

import { DescriptionBlock } from 'stacks/about'

const About: NextPage = () => {
  return (
    <AppLayout>
      <Stack>
        <Stack>
          <Heading alignSelf="flex-start">About</Heading>
          <Stack>
            <Text fontSize={36} color="kbpurple.900">
              What is kabchi?
            </Text>
            <DescriptionBlock>
              <Text>
                <Text
                  as="span"
                  fontSize="2xl"
                  color="kbpurple.800"
                  pr="1"
                  fontWeight="bold"
                >
                  kabchi
                </Text>{' '}
                is a personal development project by eastasian a web developer
                from Japan.
              </Text>
              <Text>
                kabchi will allow you to manage your goals and daily progress of
                each goals easily and also it will help you review your actions
                toward goals by visualizing your actions by day.
              </Text>
              <Text>
                With kabchi you won't forget your goals anymore. You won't give
                up your goals anymore.
              </Text>
              <Text>
                You will stay motivated toward goals. Let's achieve your goals
                with kabchi^^
              </Text>
            </DescriptionBlock>
          </Stack>
          <Stack>
            <Text fontSize={36} color="kbpurple.900">
              How to use?
            </Text>
            <DescriptionBlock>
              <Text>
                <Text
                  as="span"
                  fontSize="2xl"
                  color="kbpurple.800"
                  fontWeight="bold"
                  pr="1"
                >
                  In
                </Text>{' '}
                kabchi there is a item called wall and each walls will represent
                your goals. You can create and delete walls anytime. when
                creating wall you can set title. make sure title will describe
                your goal.
              </Text>
              <Text>
                In walls you can make comments. Comments will display based on
                date. These comments will managed by every walls.
              </Text>
              <Text>
                There are many different ways to use kabchi. I develop kabchi so
                that I can manage my goals and visualize progress by date but
                kabchi could be use as a tools for any other purpose of
                recording like dialies.
              </Text>
              <Text>
                What you need to know is you can make a wall and you can make
                comments to wall every day and you can review comments by date.
              </Text>
            </DescriptionBlock>
          </Stack>
        </Stack>
        <Stack>
          <Heading alignSelf="flex-start">Developer</Heading>
        </Stack>
      </Stack>
    </AppLayout>
  )
}

export default About