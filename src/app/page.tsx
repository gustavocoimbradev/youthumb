'use client'; 

import {useState, useMemo, useEffect} from 'react';

import Row from '@/components/Row';
import Main from '@/components/Main';
import Brand from '@/components/Brand';
import Description from '@/components/Description';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Code from '@/components/Code';

export default function Home() {

  const [isSubmited, setIsSubmited] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [currentThumbnailURL, setCurrentThumbnailURL] = useState('');
  const [currentTab, setCurrentTab] = useState(1);
  const [langCode, setLangCode] = useState('php');
  const [isCopied, setIsCopied] = useState(false);
  const [latestThumbnails, setLatestThumbnails] = useState([]);

  const videoID = useMemo(() => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoURL.match(regex);
    return match?match[1]:'';
  }, [videoURL]);

  const thumbnails = useMemo(() => ({
    MAX: `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`,
    SD: `https://img.youtube.com/vi/${videoID}/sddefault.jpg`,
    HQ: `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`,
    MQ: `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`,
    DF: `https://img.youtube.com/vi/${videoID}/default.jpg`,
  }), [videoID]);

  const handleButton = (event: React.MouseEvent) => {
    event.preventDefault();
    if (videoURL != '' && videoID != '') {
      setIsSubmited(true);
      handleTab(thumbnails.MAX, 1);
    } else {
      setIsSubmited(false);
    }
  }

  const handleTab = (url:string, tab:number) => {
    setCurrentThumbnailURL(url);
    setCurrentTab(tab);
  }

  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(langCode === 'php' ? codeSnippets.php : codeSnippets.js);
    setIsCopied(true);
    setTimeout(function(){
      setIsCopied(false);
    }, 5000);
  }

  const handleSimulateSearch = (ID:string) => {
    setVideoURL(`https://youtube.com/watch?v=${ID}`);
    setIsSubmited(true);
    setCurrentTab(1); 
    setCurrentThumbnailURL(`https://img.youtube.com/vi/${ID}/maxresdefault.jpg`);
  }
 
  useEffect(() => {
    setIsCopied(false);
  }, [langCode]);

  const codeSnippets = {
    php: `function getYouTubeThumbnail($url, $size) {
      preg_match('/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?&]v=)|https?:\/\/(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches);
      $id = $matches[1];
      $sizes = [
          'mx' => 'maxresdefault.jpg',    // 1280x720
          'sd' => 'sddefault.jpg',        // 640x480
          'hq' => 'hqdefault.jpg',        // 480x360
          'mq' => 'mqdefault.jpg',        // 320x180
          'df' => 'default.jpg'           // 120x90
      ];
      $thumbnail = isset($sizes[$size]) ? "https://img.youtube.com/vi/{$id}/{$sizes[$size]}" : "https://img.youtube.com/vi/{$id}/default.jpg";
      return $thumbnail;
  }
  
  // How to use it
  
  echo getYouTubeThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'hq');
  
  // Returns: https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg`,
    
    js: `function getYouTubeThumbnail(url, size) {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?&]v=)|https?:\/\/(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    const id = matches ? matches[1] : null;
    
    const sizes = {
        'mx': 'maxresdefault.jpg',    // 1280x720
        'sd': 'sddefault.jpg',        // 640x480
        'hq': 'hqdefault.jpg',        // 480x360
        'mq': 'mqdefault.jpg',        // 320x180
        'df': 'default.jpg'           // 120x90
    };
    
    const thumbnail = sizes[size] ? \`https://img.youtube.com/vi/\${id}/\${sizes[size]}\` : \`https://img.youtube.com/vi/\${id}/default.jpg\`;
    return thumbnail;
  }
  
  // How to use it
  
  console.log(getYouTubeThumbnail('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'hq'));
  
  // Returns: https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg`
  };

  // Logs

  useEffect(() => {
    const log = async () => {
      const action = `access`;
      const complement = `${window.innerWidth}x${window.innerHeight}`;
      const response = await fetch(`/api/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, complement }),
      });
      const data = await response.json();
      return data;
    };
    log();
  }, []);

  useEffect(() => {
    if (isSubmited) {
      const log = async () => {
        const action = `get_thumbnail`;
        const complement = `${videoID}`;
        const response = await fetch(`/api/log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, complement }),
        });
        const data = await response.json();
        return data;
      }; 
      log();
    } else {
      const log = async () => {
        const response = await fetch(`/api/log`);
        const data = await response.json();
        setLatestThumbnails(data);
      }; 
      log();
    }
  }, [isSubmited]);

  useEffect(() => {
    if (isCopied) {
      const log = async () => {
        const action = `copy_snippet`;
        const complement = `${langCode}`;
        const response = await fetch(`/api/log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, complement }),
        });
        const data = await response.json();
        return data;
      }; 
      log();
    }
  }, [isCopied]);

  return (
    <Main> 
        <Brand/>
        <Description>Extract the thumbnail from any youtube video</Description>
        <Form>
          <Input value={videoURL} onChange={(e) => setVideoURL(e.target.value)} type="text" placeholder="Paste the link of the youtube video"></Input>
          <Button variant="red" onClick={handleButton}>Get thumbnail</Button>
        </Form>
        {isSubmited ? (
          <Card>
            <Row className="overflow-auto">
              <Button variant={currentTab === 1 ? 'slate' : 'light'} grow={true} onClick={() => handleTab(thumbnails.MAX, 1)}>1280x720</Button>
              <Button variant={currentTab === 2 ? 'slate' : 'light'} grow={true} onClick={() => handleTab(thumbnails.SD, 2)}>640x480</Button>
              <Button variant={currentTab === 3 ? 'slate' : 'light'} grow={true} onClick={() => handleTab(thumbnails.HQ, 3)}>480x360</Button>
              <Button variant={currentTab === 4 ? 'slate' : 'light'} grow={true} onClick={() => handleTab(thumbnails.MQ, 4)}>320x180</Button>
              <Button variant={currentTab === 5 ? 'slate' : 'light'} grow={true} onClick={() => handleTab(thumbnails.DF, 5)}>120x90</Button>
            </Row>
            {currentThumbnailURL != '' ? (
              <>
                <Row>
                    <img src={currentThumbnailURL} className="mx-auto bg-black w-[100%] h-[400px] mt-6 mb-3 object-contain" />
                </Row>
                <Row>
                  <Input disabled={true} value={currentThumbnailURL} className="bg-slate-200 text-center p-2 text-[14px] text-slate-600 mt-1 mb-2"/>
                </Row>
              </>
            ) : ''}
            <Row className="relative">
              <form className="absolute top-5 right-3 flex flex-row items-stretch gap-3">
                {isCopied ? (
                  <span className="text-green-200 text-[14px] flex flex-row items-center">Code copied to clipboard!</span>
                ) : ''}
                <button onClick={(e) => handleCopy(e)} className={`bg-dark border-solid border px-2 py-1 text-[14px] ${isCopied ? 'border-green-200 text-green-200' : 'border-white text-white'}`}>Copy code</button>
                <select onChange={(e) => setLangCode(e.target.value)} className="bg-transparent border-solid border border-white text-white ps-2 py-1 text-[14px]">
                  <option value="php">PHP</option>
                  <option value="javascript">JS</option>
                </select>
              </form>
            </Row>
            <Row>
              <Code code={langCode === 'php' ? codeSnippets.php : codeSnippets.js } language={langCode} />
            </Row>
          </Card>)
        : ''}

        <Card className="!p-0">
          <div className="flex flex-row items-center h-[80px] relative">
            <div className="animate-color-change-1 w-full h-full"></div>
            <div className="animate-color-change-2 w-full h-full"></div>
            <div className="animate-color-change-1 w-full h-full"></div>
            <div className="animate-color-change-2 w-full h-full"></div> 
            {latestThumbnails.length > 0 && !isSubmited ? (
                <div className="absolute flex flex-row items-center animate-fade-in">
                  {latestThumbnails.map((row, i) => (
                    <div onClick={() => handleSimulateSearch(`${row['complement']}`)} className={`cursor-pointer transition-all duration-300 saturate-[80%] hover:saturate-[110%] ${i>1?'hidden md:block':''}`} key={i}>
                      <img src={`https://img.youtube.com/vi/${row['complement']}/mqdefault.jpg`} />
                    </div>
                  ))}
                </div>
            ) : ''}
          </div> 
        </Card>

        <Row>
          <div className="text-center w-full text-[14px] text-slate-700 mt-3">
            Developed by <a href="https://github.com/gustavocoimbradev" target="_blank" className="font-medium hover:text-red-600 transition-all">Gustavo Coimbra</a>
          </div>
        </Row>
    </Main>
  );
  
}
