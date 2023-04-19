import os
import json
from pprint import pprint
import youtube_transcript_api

# Get all video ids from data/video_ids.txt
with open('data/video_ids.txt', 'r') as f:
    video_ids = f.read().splitlines()

# Remove blank lines
video_ids = [x for x in video_ids if x]

# Debugging:
# video_ids = video_ids[:1]
# pprint(video_ids)

# Make transcripts directory if it doesn't exist
if not os.path.exists('data/transcripts'):
    os.makedirs('data/transcripts')

# get transcript for each video id it it doesn't already exist
for video_id in video_ids:
    transcript_file = 'data/transcripts/{}.json'.format(video_id)
    if not os.path.exists(transcript_file):
        print('Getting transcript for {}'.format(video_id))
        
        # If the following throws an error continue to the following video id
        try:
            transcript = youtube_transcript_api.YouTubeTranscriptApi.get_transcript(video_id)
            with open(transcript_file, 'w', encoding='utf-8') as f:
                f.write(json.dumps(transcript, indent=2))
        except:
            print('Error getting transcript for {}'.format(video_id))
